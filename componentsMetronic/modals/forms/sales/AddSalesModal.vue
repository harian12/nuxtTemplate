<style>
.multiselect-tag {
  background-color: #78829d;
  color: white;
}
</style>
<template>
  <div
    class="modal fade"
    id="kt_modal_add_sales"
    ref="addSalesModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_sales_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Sales Organization</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_sales_close"
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
              id="kt_modal_add_sales_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_sales_header"
              data-kt-scroll-wrappers="#kt_modal_add_sales_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Company</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="kode">
                  <Multiselect
                    v-model="formData.kode"
                    :searchable="true"
                    :options="formData.options"
                    placeholder="Select"
                    @click="Coppy($event.srcElement.innerHTML)"
                  ></Multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Sales Org</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="kodesales">
                  <el-input
                    v-model="formData.kodesales"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Coppy($event.srcElement.value)"
                  />
                  <span class="errMessageCustom">{{
                    errorMessage["code"]
                  }}</span>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Nama Sales Org</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nama">
                  <el-input
                    v-model="formData.nama"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Coppy($event.srcElement.value)"
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
              ref="submitButtonRef"
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
import { defineComponent, ref, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import Coppy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-sales-modal",
  components: { Multiselect },
  props: {
    refresh: Function,
  },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addSalesModalRef = ref<null | HTMLElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref<boolean>(false);
    let companyList: any = [];
    const formData = ref({
      mode: "multiple",
      kode: "",
      kodesales: "",
      nama: "",
      options: [],
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

      companyList.push(company.data.data);
      formData.value.options = codeCompany;
    });

    const rules = ref({
      kode: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      kodesales: [
        {
          required: true,
          message: "Kode Sales required",
          trigger: "change",
        },
      ],
      nama: [
        {
          required: true,
          message: "Nama Company is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        kode: "",
        kodesales: "",
        nama: "",
      };
      formRef?.value?.resetFields();
      loading.value = false;
      submitButtonRef.value.disabled = false;
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
            code: formData.value.kodesales.toUpperCase(),
            name: formData.value.nama.toUpperCase(),
            company_id: formData.value.kode,
          };

          let save = await ApiService.post("sales-organisasi", saveData).then(
            (data) => {
              if (data.data.status_code == 200) {
                loading.value = false;
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
                  hideModal(addSalesModalRef.value);
                  emit("refresh");
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

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addSalesModalRef,
      submitButtonRef,
      getAssetPath,
      countries,
      Multiselect,
      Coppy,
      resetForm,
      errorMessage,
    };
  },
});
</script>
