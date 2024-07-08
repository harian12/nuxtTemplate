<template>
  <div
    class="modal fade"
    id="kt_modal_add_pulau"
    ref="addPulauModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Pulau</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_pulau_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="resetForm"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_pulau_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_pulau_header"
              data-kt-scroll-wrappers="#kt_modal_add_pulau_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nama Pulau</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nama">
                  <el-input
                    v-model="formData.nama"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                  <span class="errMessageCustom">{{
                    errorMessage["pulau"]
                  }}</span>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
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
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-pulau-modal",
  components: {},
  props: {
    reload: Function,
  },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addPulauModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      nama: "",
    });

    const rules = ref({
      nama: [
        {
          required: true,
          message: "Nama Pulau is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        nama: "",
      };
      formRef?.value?.resetFields();
      errorMessage.value = [];
    };

    const errorMessage = ref<any>([]);
    const submit = () => {
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
        loading.value = false;
        return;
      }

      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          const saveData = {
            pulau: formData.value.nama.toUpperCase(),
          };

          await ApiService.post("pulau", saveData).then((data) => {
            loading.value = false;
            if (data.data.status_code == 200) {
              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              }).then(() => {
                hideModal(addPulauModalRef.value);
                emit("reload");
              });
            } else if (data.data.status_code == 400) {
              data.data.errors.forEach((val) => {
                errorMessage.value[val.path] = val.msg;
              });
            } else if (data.data.status_code == 500) {
              let msg = `<li style='text-aling:left'>${data.data.msg}</li>`;
              Swal.fire({
                icon: "error",
                html: msg,
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            }
          });
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addPulauModalRef,
      getAssetPath,
      countries,
      Copy,
      resetForm,
      errorMessage,
    };
  },
});
</script>
