<template>
  <div
    class="modal fade"
    id="kt_modal_add_merchant"
    ref="addFormModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_merchant_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Relasi Merchant Jurnal Code</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_merchant_close"
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
              id="kt_modal_add_merchant_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_merchant_header"
              data-kt-scroll-wrappers="#kt_modal_add_merchant_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Company</label>

                  <el-form-item prop="company">
                    <Multiselect
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      label="label"
                      @click="CopyEvent(formData.company, 'company')"
                      @keydown.enter.prevent="
                        () => {
                          merchant.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Merchant</label
                  >
                  <el-form-item prop="merchant">
                    <Multiselect
                      v-model="formData.merchant"
                      ref="merchant"
                      :searchable="true"
                      :options="formData.optionsMerchant"
                      placeholder="Select"
                      @click="CopyEvent(formData.merchant, 'merchant')"
                      @keydown.enter.prevent="
                        () => {
                          jurnalCode.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jurnal Code Bank</label
                  >

                  <el-form-item prop="jurnalCode">
                    <el-input
                      v-model="formData.jurnalCode"
                      ref="jurnalCode"
                      type="text"
                      @keydown.enter.prevent="
                        () => {
                          discRate.focus();
                        }
                      "
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jurnal Code Disc Rate</label
                  >

                  <el-form-item prop="discRate">
                    <el-input
                      v-model="formData.discRate"
                      type="text"
                      ref="discRate"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
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
import { defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-merchant-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const submitButtonRef = ref<any | HTMLButtonElement>(null);
    const loading = ref<boolean>(false);
    const merchant = ref();
    const jurnalCode = ref();
    const discRate = ref();
    const formData = ref({
      merchant: "",
      optionsMerchant: [],
      optionsCompany: [],
      company: "",
      jurnalCode: "",
      discRate: "",
    });

    onMounted(async () => {
      let merchant: any = [];
      await ApiService.get("merchant?status=[Active]").then((data) => {
        data.data.data.forEach((val) => {
          merchant.push({
            value: val.merchant_id,
            label: val.merch_code + " - " + val.merch_name,
          });
        });
      });
      formData.value.optionsMerchant = merchant;

      let company: any = [];
      await ApiService.get("company").then((data) => {
        data.data.data.forEach((val) => {
          company.push({
            value: val.company_id,
            label: val.company_code + "-" + val.company_name,
          });
        });
      });
      formData.value.optionsCompany = company;
    });

    const rules = ref({
      merchant: [
        {
          required: true,
          message: "Kode Merchant is required",
          trigger: "change",
        },
      ],
      company: [
        {
          required: true,
          message: "Company is required",
          trigger: "change",
        },
      ],
      jurnalCode: [
        {
          required: true,
          message: "Jurnal Code Bank is required",
          trigger: "change",
        },
      ],
      discRate: [
        {
          required: true,
          message: "Jurnal Code Disc Rate is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        merchant: "",
        company: "",
        jurnalCode: "",
        discRate: "",
      };
      formRef?.value?.resetFields();
    };

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
          const file = {
            company_id: formData.value.company,
            merchant_id: formData.value.merchant,
            jurnal_code_bank: formData.value.jurnalCode.toUpperCase(),
            jurnal_code_disc_rate: formData.value.discRate.toUpperCase(),
          };

          await ApiService.post("merchant-jurcode", file).then((data) => {
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
                submitButtonRef.value.disabled = false;
                loading.value = false;
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
              submitButtonRef.value.disabled = false;
              loading.value = false;
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
              submitButtonRef.value.disabled = false;
              loading.value = false;
            }
          });
        }
      });
    };

    const CopyEvent = (data, act) => {
      if (act == "company") {
        formData.value.optionsCompany.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "merchant") {
        formData.value.optionsMerchant.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      }
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
      Copy,
      CopyEvent,
      merchant,
      jurnalCode,
      discRate,
      resetForm,
    };
  },
});
</script>
