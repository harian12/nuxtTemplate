<template>
  <div
    class="modal fade"
    id="kt_modal_add_jurnalcode"
    ref="addFormModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_jurnalcode_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Jurnal Code</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_jurnalcode_close"
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
              id="kt_modal_add_jurnalcode_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_jurnalcode_header"
              data-kt-scroll-wrappers="#kt_modal_add_jurnalcode_scroll"
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
                <el-form-item prop="company">
                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :close-on-select="false"
                    :groups="true"
                    mode="tags"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    :disabled="formData.company.length == 1"
                  ></Multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Jurnal</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="jurnal_code">
                  <el-input
                    v-model="formData.jurnal_code"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Deskripsi</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="jurnal_desc">
                  <el-input
                    v-model="formData.jurnal_desc"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Nature Penjualan</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nature_penjualan">
                  <el-input
                    v-model="formData.nature_penjualan"
                    type="textarea"
                    rows="3"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Status</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div
                  class="form-check form-switch form-check-custom form-check-solid mt-2"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexSwitchChecked"
                    v-model="formData.status"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ formData.status ? "Active" : "Inactive" }}
                  </label>
                </div>
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
              :disabled="loading"
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import { company } from "../../../../stores/company";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-jurnalcode-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const formData: any = ref({
      company: [],
      jurnal_code: "",
      jurnal_desc: "",
      nature_penjualan: "",
      status: true,
      company_id: "",
      optionsCompany: {
        label: "Select All",
        options: [],
      },
    });

    watch(
      () => company.list,
      (list) => {
        formData.value.company = list;
      }
    );

    onMounted(async () => {
      let companyList: any = [];

      await ApiService.get("company")
        .then((data) => {
          data.data.data.forEach((val) => {
            companyList.push({
              value: val.company_id,
              label: val.company_code + "-" + val.company_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      formData.value.optionsCompany.options = companyList;
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        company: [],
        jurnal_code: "",
        jurnal_desc: "",
        nature_penjualan: "",
        status: true,
        company_id: "",
      };
      formRef?.value?.resetFields();
    };

    const rules = ref({
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      jurnal_code: [
        {
          required: true,
          message: "Kode Jurnal is required",
          trigger: "change",
        },
      ],
      jurnal_desc: [
        {
          required: true,
          message: "Deskripsi is required",
          trigger: "change",
        },
      ],
      nature_penjualan: [
        {
          required: true,
          message: "Nature Penjualan is required",
          trigger: "change",
        },
      ],
    });

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

      loading.value = true;

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          const saveData = {
            jurnal_code: formData.value.jurnal_code,
            jurnal_desc: formData.value.jurnal_desc.toUpperCase(),
            nature_penjualan: formData.value.nature_penjualan.toUpperCase(),
            status: formData.value.status == true ? "Active" : "Inactive",
            jurnal_company: formData.value.company.map((x) => {
              return { company: x };
            }),
          };

          await ApiService.post("jurnal", saveData).then((data) => {
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
                hideModal(addFormModalRef.value);
                emit("reload");
                loading.value = false;
              });
            } else if (data.data.status_code == 400) {
              let msg = "";
              data.data.errors.forEach((val) => {
                msg += `<li style='text-aling:left'>${val.msg}</li>`;
              });
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
      addFormModalRef,
      submitButtonRef,
      getAssetPath,
      countries,
      Multiselect,
      company,
      resetForm,
      Copy,
    };
  },
});
</script>
