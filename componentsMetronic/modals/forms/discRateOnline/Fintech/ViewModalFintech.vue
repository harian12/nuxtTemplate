<template>
  <div
    class="modal fade"
    id="kt_modal_edit_fnt"
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
        <div class="modal-header" id="kt_modal_edit_fnt_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ formData.editModal == "edit" ? "Update" : "View" }} Data Fintech
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_edit_fnt_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
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
              id="kt_modal_edit_fnt_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_edit_fnt_header"
              data-kt-scroll-wrappers="#kt_modal_edit_fnt_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Company</label>
                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    label="label"
                    @keydown.enter.prevent="
                      () => {
                        durasi.focus();
                      }
                    "
                    @click="Copy($event.srcElement.innerText)"
                    disabled
                  ></Multiselect>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jenis Fintech</label
                  >
                  <Multiselect
                    v-model="formData.jenis"
                    :searchable="true"
                    :options="formData.optionsJenis"
                    placeholder="Select"
                    label="label"
                    ref="jenis"
                    @keydown.enter.prevent="
                      () => {
                        durasi.focus();
                      }
                    "
                    @click="Copy($event.srcElement.innerText)"
                    disabled
                  ></Multiselect>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Durasi Settlement</label
                  >
                  <el-form-item prop="durasi">
                    <el-input
                      v-model="formData.durasi"
                      type="number"
                      ref="durasi"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          merchant.focus();
                        }
                      "
                      :class="{ 'is-disabled': formData.editModal != 'edit' }"
                    />
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Merchant</label>
                  <el-form-item prop="merchant_id">
                    <Multiselect
                      v-model="formData.merchant_id"
                      :searchable="true"
                      :options="formData.optionsMerchant"
                      placeholder="Select"
                      label="label"
                      ref="merchant"
                      :disabled="formData.editModal != 'edit'"
                      @keydown.enter.prevent="
                        () => {
                          fee.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Bank Fee</label>
                  <el-form-item prop="fee">
                    <el-input
                      v-model="formData.fee"
                      type="text"
                      ref="fee"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          payment.focus();
                        }
                      "
                      :class="{ 'is-disabled': formData.editModal != 'edit' }"
                      :readonly="formData.editModal == 'View'"
                      @keyup="
                        () => {
                          // formData.fee = formData.fee
                          //   .replace(/\D/g, '')
                          //   .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                          formData.fee = discRateHelper(formData.fee);
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway</label
                  >
                  <el-form-item prop="payment"
                    ><Multiselect
                      v-model="formData.payment"
                      :searchable="true"
                      :options="formData.optionsPayment"
                      placeholder="Select"
                      label="label"
                      ref="payment"
                      @keydown.enter.prevent="
                        () => {
                          paymentFee.focus();
                        }
                      "
                      @click="CopyEvent(formData.payment, 'payment')"
                      :disabled="formData.editModal != 'edit'"
                    ></Multiselect
                  ></el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway Fee</label
                  >
                  <el-form-item prop="paymentFee">
                    <el-input
                      v-model="formData.paymentFee"
                      type="text"
                      ref="paymentFee"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          faktif.focus();
                        }
                      "
                      :class="{ 'is-disabled': formData.editModal != 'edit' }"
                      :readonly="formData.editModal == 'View'"
                      @keyup="
                        () => {
                          formData.paymentFee = formData.paymentFee
                            .replace(/\D/g, '')
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
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
                      :disabled="formData.editModal != 'edit'"
                      @click="
                        () => {
                          formData.faktif = !formData.faktif;
                        }
                      "
                      ref="faktif"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.faktif ? "Active" : "Inactive" }}
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
          <div
            class="modal-footer flex-center"
            v-if="formData.editModal == 'edit'"
          >
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../../helper/coppied";
import { merchantOption } from "@/stores/merchant";
import discRateHelper from "@/helper/discRate";

export default defineComponent({
  name: "add-merchant-modal",
  components: { Multiselect },
  props: {
    company: String,
    viewData: Object,
    reloadGet: Function,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const durasi = ref();
    const merchant = ref();
    const fee = ref();
    const payment = ref();
    const paymentFee = ref();
    const faktif = ref();
    const formData = ref({
      company: "",
      durasi: "",
      merchant: "",
      payment: "",
      paymentFee: "",
      fee: "",
      faktif: true,
      optionsMerchant: [] as any,
      optionsCompany: [],
      optionsPayment: [],
      editModal: "edit",
      id: "",
      jenis: "",
      optionsJenis: [],
      merchant_id: "",
    });

    watch(
      () => JSON.parse(JSON.stringify(props.viewData)),
      (viewData) => {
        formData.value.company = viewData.company;
        formData.value.editModal = viewData.editModal;
        formData.value.durasi = viewData.durasi;
        formData.value.merchant = viewData.merchant;
        formData.value.payment = viewData.payment;
        formData.value.paymentFee = viewData.paymentFee;
        formData.value.fee = viewData.fee;
        formData.value.faktif = viewData.faktif == "Active" ? true : false;
        formData.value.id = viewData.id;
        formData.value.jenis = viewData.jenis;
        formData.value.merchant_id = viewData.merchant_id;
      }
    );
    watch(
      () => merchantOption.list,
      (data) => {
        formData.value.optionsMerchant = data;
      }
    );

    onMounted(() => {
      filterList();
    });

    const filterList = async () => {
      let company: any = [];
      let jenis: any = [];
      let pg: any = [];

      await ApiService.get("company")
        .then((data) => {
          data.data.data.forEach((val) => {
            company.push({
              value: val.company_id,
              label: val.company_code + "-" + val.company_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get("jenis-fintech").then((data) => {
        data.data.data.forEach((val) => {
          jenis.push({
            value: val.jenis_fintech_id,
            label: val.jenis_fintech,
          });
        });
      });

      await ApiService.get("penunjang?master_name=Vendor payment gateway").then(
        (data) => {
          data.data.data.forEach((val) => {
            pg.push({
              value: val.value1,
              label: val.value1,
            });
          });
        }
      );

      formData.value.optionsPayment = pg;
      formData.value.optionsCompany = company;
      formData.value.optionsJenis = jenis;
    };

    const rules = ref({
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      durasi: [
        {
          required: true,
          message: "Durasi Settlement is required",
          trigger: "change",
        },
      ],
      merchant_id: [
        {
          required: true,
          message: "Merchant is required",
          trigger: "change",
        },
      ],
      payment: [
        {
          required: true,
          message: "Payment gateway is required",
          trigger: "change",
        },
      ],
      paymentFee: [
        {
          required: true,
          message: "Payment gateway fee is required",
          trigger: "change",
        },
      ],
      fee: [
        {
          required: true,
          message: "Bank Fee is required",
          trigger: "change",
        },
      ],
      jenis: [
        {
          required: true,
          message: "jenis is required",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          const save = {
            company_id: formData.value.company,
            payment_gateway: formData.value.payment,
            bank_fee: formData.value.fee.replace(",", "."),
            payment_gateway_fee: formData.value.paymentFee,
            durasi_settlement: formData.value.durasi,
            status: formData.value.faktif ? "Active" : "Inactive",
            disc_rate_on_fintech_id: formData.value.id,
            jenis_fintech_id: formData.value.jenis,
            merchant_id: formData.value.merchant_id,
          };

          await ApiService.put("disc-rate-online/fintech", save).then(
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
                  emit("reloadGet", props.company);
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

    const CopyEvent = (data, act) => {
      if (act == "merchant") {
        formData.value.optionsMerchant.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "payment") {
        formData.value.optionsPayment.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "jenis") {
        formData.value.optionsJenis.forEach((val: any) => {
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
      getAssetPath,
      Multiselect,
      Copy,
      props,
      durasi,
      merchant,
      fee,
      payment,
      paymentFee,
      faktif,
      CopyEvent,
      discRateHelper,
    };
  },
});
</script>
