<template>
  <div
    class="modal fade"
    id="kt_modal_add_rekeningbank"
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
        <div class="modal-header" id="kt_modal_add_rekeningbank_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Rekening Bank</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_rekeningbank_close"
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
              id="kt_modal_add_rekeningbank_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_rekeningbank_header"
              data-kt-scroll-wrappers="#kt_modal_add_rekeningbank_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row fv-row">
                <div class="col-12 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Company</label
                  >
                  <el-form-item>
                    <Multiselect
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      @select="
                        (id, _) => {
                          formData.company = id;
                        }
                      "
                      @click="
                        () => {
                          formData.optionsCompany.forEach((element) => {
                            if (formData.company == element.value) {
                              Copy(element.label);
                            }
                          });
                        }
                      "
                      :disabled="formData.company.length == 1"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-12 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >No Rekening</label
                  >
                  <el-form-item prop="norek">
                    <el-input
                      v-model="formData.norek"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Bank</label>
                  <el-form-item prop="bank">
                    <el-input
                      v-model="formData.bank"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Atas Nama</label
                  >
                  <el-form-item prop="atas_nama">
                    <el-input
                      v-model="formData.atas_nama"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>

                <div class="col-3 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >F Virtual</label
                  >
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
                      v-model="formData.f_virtual"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_virtual ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-3 fv-row">
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
              </div>
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import { company } from "../../../../stores/company";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-rekeningbank-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const formData = ref({
      company: "",
      norek: "",
      bank: "",
      atas_nama: "",
      f_virtual: false,
      f_delete: "",
      status: true,
      rekening_bank_id: "",
      company_id: "",
      optionsCompany: <any>[],
    });

    watch(
      () => company.list,
      (list) => {
        formData.value.company = String(list);
      }
    );

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        norek: "",
        bank: "",
        atas_nama: "",
        f_virtual: false,
        f_delete: "",
        status: true,
        rekening_bank_id: "",
        company_id: "",
      };

      formRef?.value?.resetFields();
    };

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
      formData.value.optionsCompany = companyList;
    });

    const rules = ref({
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      norek: [
        {
          required: true,
          message: "No Rekening Code is required",
          trigger: "change",
        },
      ],
      bank: [
        {
          required: true,
          message: "Bank is required",
          trigger: "change",
        },
      ],
      atas_nama: [
        {
          required: true,
          message: "Atas Nama is required",
          trigger: "change",
        },
      ],
      f_virtual: [
        {
          required: true,
          message: "Virtual is required",
          trigger: "change",
        },
      ],
      status: [
        {
          required: true,
          message: "Status is required",
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

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          const saveData = {
            norek: formData.value.norek,
            bank: formData.value.bank.toUpperCase(),
            atas_nama: formData.value.atas_nama.toUpperCase(),
            f_virtual: formData.value.f_virtual == true ? "Y" : "N",
            status: formData.value.status == true ? "Active" : "Inactive",
            rekbank_company: [{ company: formData.value.company }],
          };

          let save = await ApiService.post("rekening-bank", saveData).then(
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
                  hideModal(addFormModalRef.value);
                  emit("reload");
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
      addFormModalRef,
      getAssetPath,
      countries,
      Multiselect,
      resetForm,
      Copy,
    };
  },
});
</script>
