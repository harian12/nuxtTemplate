<template>
  <div
    class="modal fade"
    id="kt_modal_add_bunit"
    ref="addBunitModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_bunit_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Bisnis Unit</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_bunit_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="
              () => {
                resetForm();
              }
            "
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
              id="kt_modal_add_bunit_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_bunit_header"
              data-kt-scroll-wrappers="#kt_modal_add_bunit_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Company</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="company_id">
                  <Multiselect
                    v-model="formData.company_id"
                    :searchable="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerHTML)"
                  ></Multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Bisnis Unit</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="bisnis_unit_code">
                  <el-input
                    v-model="formData.bisnis_unit_code"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                  <span class="errMessageCustom">{{
                    errorMessage["bisnis_unit_code"]
                  }}</span>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Nama Bisnis Unit</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="bisnis_unit">
                  <el-input
                    v-model="formData.bisnis_unit"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
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
import { defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "add-bunit-modal",
  components: { Multiselect },
  props: {
    reloadList: Function,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addBunitModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      company_id: "",
      bisnis_unit_code: "",
      bisnis_unit: "",
      optionsCompany: [],
    });

    const rules = ref({
      company_id: [
        {
          required: true,
          message: "Company is required",
          trigger: "change",
        },
      ],
      bisnis_unit_code: [
        {
          required: true,
          message: "Kode Bisnis Unit is required",
          trigger: "change",
        },
      ],
      bisnis_unit: [
        {
          required: true,
          message: "Nama Bisnis Unit is required",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      let company = await ApiService.get("company");
      let codeCompany: any = [];
      company.data.data.forEach((val): any => {
        if (val.company_code != null) {
          codeCompany.push({
            value: val.company_id,
            label: val.company_code + "-" + val.company_name,
          });
        }
      });

      formData.value.optionsCompany = codeCompany;
    });

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
            bisnis_unit_code: formData.value.bisnis_unit_code,
            bisnis_unit: formData.value.bisnis_unit,
            company_id: formData.value.company_id,
          };

          let save = await ApiService.post("bisnis-unit", saveData).then(
            (data) => {
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
                  hideModal(addBunitModalRef.value);
                  emit("reloadList");
                  return false;
                });
              } else if (data.data.status_code == 400) {
                data.data.errors.forEach((val) => {
                  errorMessage.value[val.path] = val.msg;
                });
              }
            }
          );
        }
      });
    };

    const resetForm = () => {
      errorMessage.value = [];
      formRef?.value?.resetFields();
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addBunitModalRef,
      getAssetPath,
      countries,
      Copy,
      resetForm,
      errorMessage,
    };
  },
});
</script>
