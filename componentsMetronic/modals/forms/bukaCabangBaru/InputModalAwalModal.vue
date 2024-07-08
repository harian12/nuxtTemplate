<template>
  <div
    class="modal fade"
    id="kt_InputModalAwalModal"
    ref="InputModalAwalModal"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_InputModalAwalModal_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Input Modal</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_InputModalAwalModal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form
          @submit.prevent="submitForm()"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <div class="modal-body py-10 px-lg-17">
            <div class="row">
              <div class="col-12 mb-2 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Kode plant</label>
                <el-form-item>
                  <el-input
                    v-model="form.plant_code"
                    type="text"
                    class="is-disabled"
                    readonly
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>

              <div class="col-12 mb-2 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Saldo awal</label>
                <el-form-item prop="modal_awal">
                  <el-input
                    type="number"
                    v-model="form.modal_awal"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-danger"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-5 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { hideModal } from "@/core/helpers/dom";
import ApiService from "@/core/services/ApiService";
import { inputModal } from "@/stores/bukaCabangBaru";
import Swal from "sweetalert2";
import { defineComponent, ref, watch } from "vue";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "UploadAsetModal",
  emit: ["reload"],
  data() {
    return {
      loading: false,
      form: {
        cabang_bisnis_unit_id: "",
        plant_code: "",
        modal_awal: "",
      },
      rules: {
        modal_awal: [
          {
            required: true,
            message: "Saldo awal is required",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
          const form = {
            cabang_bisnis_unit_id: this.form.cabang_bisnis_unit_id,
            modal_awal: this.form.modal_awal,
          };
          this.loading = true;
          this.updateData(form);
        }
      });
    },
    async updateData(form) {
      try {
        const { data } = await ApiService.put(
          "cabang/bisnis-unit/modal-awal",
          form
        );
        this.loading = false;

        if (data.errors) {
          const [arr] = data.errors;
          Swal.fire({
            text: `${arr.value} sudah ada`,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
        hideModal(this.InputModalAwalModal);
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          this.$emit("reload");
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
  created() {
    watch(
      () => inputModal.data,
      (data) => {
        this.form = {
          ...data,
          modal_awal: data.modal_awal ?? "",
        };
      }
    );
  },
  setup() {
    const InputModalAwalModal = ref<HTMLDListElement | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);

    return { InputModalAwalModal, formRef, Copy };
  },
});
</script>
