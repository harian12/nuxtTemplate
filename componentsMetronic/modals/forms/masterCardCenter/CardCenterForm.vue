<template>
  <div
    class="modal fade"
    id="kt_modal_CardCenterForm"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="CardCenterForm_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ title }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="CardCenterForm_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="resetForm"
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
          <div class="modal-body">
            <div class="row">
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Kode card center
                </label>
                <el-form-item prop="card_center_code">
                  <el-input
                    v-model="form.card_center_code"
                    type="text"
                    :class="{ 'is-disabled': !!detail }"
                    @click="Copy($event.srcElement.value)"
                    @keydown.enter.prevent="
                      () => {
                        namaCardCenter.focus();
                      }
                    "
                  />
                </el-form-item>
              </div>
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Nama card center
                </label>
                <el-form-item prop="card_center_name">
                  <el-input
                    v-model="form.card_center_name"
                    type="text"
                    :class="{ 'is-disabled': view }"
                    ref="namaCardCenter"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center" v-if="!view">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-danger"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
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

<style>
input {
  text-transform: uppercase;
}
</style>
<script lang="ts">
import { hideModal } from "@/core/helpers/dom";
import ApiService from "@/core/services/ApiService";
import type { AxiosError } from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { defineComponent, ref } from "vue";
import Copy from "@/helper/coppied";

export default defineComponent({
  name: "form-jenis-kartu",
  props: ["data", "title", "view", "reload"],
  data() {
    return {
      detail: null,
      rules: {
        card_center_code: [
          {
            required: true,
            message: "Code Card Required",
            trigger: "change",
          },
        ],
        card_center_name: [
          {
            required: true,
            message: "Nama Card Required",
            trigger: "change",
          },
        ],
      },

      loading: false,
      form: {
        card_center_code: "",
        card_center_name: "",
      },
    };
  },
  updated() {
    if (this.$props.data) {
      const { card_center_code, card_center_name } = this.$props.data;
      this.detail = this.$props.data;
      this.form = {
        card_center_code,
        card_center_name,
      };
    } else {
      this.form = {
        card_center_code: "",
        card_center_name: "",
      };
      this.detail = null;
    }
  },
  methods: {
    resetForm() {
      this.detail = null;
      this.formRef?.resetFields();
    },
    submitForm() {
      if (navigator.onLine) {
        console.log("online");
      } else {
        console.log("offline");
        Swal.fire({
          icon: "info",
          html: "System Offline",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
          this.loading = true;
          Object.entries(this.form).forEach((item) => {
            this.form[item[0]] = item[1].toUpperCase();
          });
          if (this.detail) {
            const { card_center_id } = this.detail;
            const frm = {
              card_center_id,
              card_center_name: this.form.card_center_name,
            };
            this.updateForm(frm);
          } else {
            this.createForm(this.form);
          }
        }
      });
    },
    async createForm(data) {
      try {
        const res = await ApiService.post("card-center", data);
        this.loading = false;

        if (res.data.errors) {
          const [arr] = res.data.errors;
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

        hideModal(this.modalRef);

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
        const e = error as AxiosError;
        let msg = e.message;
        if (e.response?.data) {
          const { data } = e.response.data as any;
          msg = data.msg;
        }
        Swal.fire({
          text: msg,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    },
    async updateForm(data) {
      try {
        await ApiService.put("card-center", data);
        this.loading = false;
        hideModal(this.modalRef);

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
        const e = error as AxiosError;
        let msg = e.message;
        if (e.response?.data) {
          const { data } = e.response.data as any;
          msg = data.msg;
        }
        Swal.fire({
          text: msg,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    },
  },
  setup() {
    const modalRef = ref<null | HTMLElement>(null);
    const formRef = ref<null | HTMLFormElement>(null);
    const namaCardCenter = ref();
    const errMessage = ref<any>([]);
    return {
      modalRef,
      formRef,
      Copy,
      namaCardCenter,
      errMessage,
    };
  },
});
</script>
