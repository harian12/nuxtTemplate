<style>
.multiselect-tag {
  background-color: #78829d;
  color: white;
}
</style>
<template>
  <div
    class="modal fade"
    id="kt_modal_add_sloc"
    ref="addSlocModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_sloc_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Sloc</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_sloc_close"
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
              id="kt_modal_add_sloc_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_sloc_header"
              data-kt-scroll-wrappers="#kt_modal_add_sloc_scroll"
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
                <el-form-item prop="kodecompany">
                  <Multiselect
                    v-model="formData.kodecompany"
                    :searchable="true"
                    :options="formData.options"
                    placeholder="Select"
                    @change="
                      ($event) => {
                        changeBunit($event);
                      }
                    "
                  ></Multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Kode Plant</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="kodeplant">
                  <multiselect
                    v-model="formData.kodeplant"
                    :searchable="true"
                    :create-option="true"
                    :options="formData.optionsPlan"
                    placeholder="Select"
                  ></multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Kode Sloc</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="kode">
                  <el-input
                    v-model="formData.kode"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
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
                <label class="required fs-6 fw-semobold mb-2">Nama Sloc</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nama">
                  <el-input
                    v-model="formData.nama"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
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

export default defineComponent({
  name: "add-sloc-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addSlocModalRef = ref<null | HTMLElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref<boolean>(false);
    let companyList: any = [];
    const formData = ref({
      mode: "multiple",
      kodecompany: "",
      kode: "",
      nama: "",
      options: [],
      kodeplant: "",
      optionsPlan: {},
    });

    onMounted(async () => {
      let company = await ApiService.get("company");

      let codeCompany: any = [];
      company.data.data.forEach((val: any) => {
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

    const changeBunit = async (id) => {
      let plant = await ApiService.get(`plant?company_id=${id}`);
      let optionPlantList: any = [];
      plant.data.data.forEach((val: any) => {
        optionPlantList.push({
          value: val.plant_code,
          label: `${val.plant_code}-${val.plant_name}`,
        });
      });
      formData.value.optionsPlan = optionPlantList;
    };

    const rules = ref({
      kodecompany: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      kodeplant: [
        {
          required: true,
          message: "Kode Plant is required",
          trigger: "change",
        },
      ],
      kode: [
        {
          required: true,
          message: "Kode Sloc is required",
          trigger: "change",
        },
      ],
      nama: [
        {
          required: true,
          message: "Nama Sloc is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        kode: "",
        nama: "",
        kodeplant: "",
        kodecompany: "",
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

      //Disable button
      submitButtonRef.value.disabled = true;
      loading.value = true;

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          const saveData = {
            code: formData.value.kode,
            name: formData.value.nama.toUpperCase(),
            plant_id: formData.value.kodeplant,
            company_id: formData.value.kodecompany,
          };

          await ApiService.post("sloc", saveData)
            .then((data) => {
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
                  hideModal(addSlocModalRef.value);
                  emit("reload");
                });
              } else if (data.data.status_code == 400) {
                data.data.errors.forEach((val) => {
                  errorMessage.value[val.path] = val.msg;
                });
              } else {
                Swal.fire({
                  text: data.data.msg,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
                loading.value = false;
                submitButtonRef.value.disabled = false;
              }
            })
            .catch((errors) => {
              submitButtonRef.value.disabled = false;
              loading.value = false;
            });
        } else {
          loading.value = false;
          submitButtonRef.value.disabled = false;
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addSlocModalRef,
      submitButtonRef,
      getAssetPath,
      countries,
      Multiselect,
      resetForm,
      changeBunit,
      errorMessage,
    };
  },
});
</script>
