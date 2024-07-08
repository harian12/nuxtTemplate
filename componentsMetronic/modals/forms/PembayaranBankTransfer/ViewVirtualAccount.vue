<template>
  <div
    class="modal fade"
    id="kt_modal_view_va"
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
        <div class="modal-header" id="kt_modal_view_va_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ formData.editModal == "edit" ? "Update" : "View" }} Jenis Bank
            Transfer Virtual Account
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_view_va_close"
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
              id="kt_modal_view_va_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_view_va_header"
              data-kt-scroll-wrappers="#kt_modal_view_va_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Company</label>
                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    label="label"
                    @click="Copy($event.srcElement.innerText)"
                    disabled
                  ></Multiselect>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Bank</label>
                  <Multiselect
                    v-model="formData.bank"
                    :searchable="true"
                    :options="formData.optionsBank"
                    placeholder="Select"
                    label="label"
                    @click="CopyEvent(formData.bank, 'bank')"
                    @keydown.enter.prevent="
                      () => {
                        pg.focus();
                      }
                    "
                    :disabled="formData.editModal != 'edit'"
                  ></Multiselect>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway</label
                  >
                  <Multiselect
                    v-model="formData.pg"
                    :searchable="true"
                    :options="formData.optionsPg"
                    placeholder="Select"
                    label="label"
                    ref="pg"
                    @click="CopyEvent(formData.pg, 'pg')"
                    @keydown.enter.prevent="
                      () => {
                        pgFee.focus();
                      }
                    "
                    :disabled="formData.editModal != 'edit'"
                  ></Multiselect>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway Fee</label
                  >
                  <el-form-item>
                    <el-input
                      v-model="formData.pgFee"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                      ref="pgFee"
                      :class="{ 'is-disabled': formData.editModal != 'edit' }"
                      :readonly="formData.editModal == 'View'"
                      @keyup="
                        () => {
                          formData.pgFee = formData.pgFee
                            .replace(/\D/g, '')
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4" style="width: 6%">Image</div>
                <div class="col-8" style="width: 94%"><hr /></div>
                <div class="col-md-9 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">File</label>
                  <el-form-item>
                    <el-input
                      v-model="formData.image"
                      type="text"
                      placeholder=""
                      disabled
                    />
                  </el-form-item>
                </div>
                <div class="col-1 py-10">
                  <a
                    @click="displayImage(formData.image)"

                    ><i
                    class="fa fa-eye"
                    :style="{
                      color:
                        formData.image == detailImage.name ? '#af272f' : '',
                    }"
                  ></i
                  ></a>
                </div>
              </div>
              <div id="imageshow" class="card bg-light shadow-sm" v-if="detailImage.showImage">
                <div class="card-header">
                  <h3 class="card-title">{{ detailImage.name }}</h3>
                  <div class="card-toolbar">
                    <a
                      @click="closeImage()"
                      class="btn btn-icon btn-sm btn-active-icon-primary active"
                      data-kt-card-action="remove"
                      data-kt-card-confirm="true"
                      data-kt-card-confirm-message="Are you sure to remove this card ?"
                      data-bs-toggle="tooltip"
                      title="Remove card"
                      data-bs-dismiss="click"
                    >
                      <i class="ki-duotone ki-cross fs-1"
                      ><span class="path1"></span><span class="path2"></span
                      ></i>
                    </a>
                  </div>
                </div>
                <div class="card-body card-scroll h-350px">
                  <img
                    :src="'http://' + detailImage.url"
                    class="w-500px me-3"
                    alt="image"
                  />
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
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-merchant-modal",
  components: { Multiselect },
  props: {
    sendView: Object,
    reloadList: Function,
    filterList: String,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const pgFee = ref();
    const image = ref();
    const formData = ref({
      optionsCompany: [],
      company: "",
      bank: "",
      optionsBank: [],
      pg: "",
      optionsPg: [],
      image: new Blob(),
      pgFee: "",
      rekId: "",
      editModal: "edit",
      bankTfId: "",
    });

    const detailImage = ref({
      showImage: false,
      name: "",
      url: "",
    });

    const displayImage = (name) => {
      detailImage.value.showImage = true;
      if (name) {
        detailImage.value.name = name;
        detailImage.value.url = name;
      }
    };

    watch(
      () => JSON.parse(JSON.stringify(props.sendView)),
      (send) => {
        detailImage.value.showImage = false;
        formData.value.company = send.company;
        formData.value.bank = send.bank;
        formData.value.pg = send.pg;
        formData.value.pgFee = send.pgFee;
        formData.value.rekId = String(send.id);
        formData.value.editModal = send.editModal;
        formData.value.bankTfId = send.bankTfId;
        formData.value.image = send.image;
      }
    );

    onMounted(async () => {
      let company: any = [];
      let bank: any = [];
      let pg: any = [];
      await ApiService.get("company").then((data) => {
        data.data.data.forEach((val) => {
          company.push({
            value: val.company_id,
            label: val.company_code + "-" + val.company_name,
          });
        });
      });

      await ApiService.get("card-center?status=Active").then((data) => {
        data.data.data.forEach((val) => {
          bank.push({
            value: val.card_center_id,
            label: val.card_center_name,
          });
        });
      });

      await ApiService.get("penunjang?master_name=Vendor payment gateway").then(
        (data) => {
          data.data.data.forEach((val) => {
            pg.push(val.value1);
          });
        }
      );
      formData.value.optionsCompany = company;
      formData.value.optionsBank = bank;
      formData.value.optionsPg = pg;
    });

    const rules = ref({
      company: [
        {
          required: true,
          message: "company is required",
          trigger: "change",
        },
      ],
      bank: [
        {
          required: true,
          message: "bank is required",
          trigger: "change",
        },
      ],
      pg: [
        {
          required: true,
          message: "Payment Gateway is required",
          trigger: "change",
        },
      ],
      pgFee: [
        {
          required: true,
          message: "Payment Gateway Fee is required",
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

          let save = {
            bank_transfer_id: formData.value.bankTfId,
            card_center_id: formData.value.bank,
            bank_transfer_rek_id: formData.value.rekId,
            payment_gateway: formData.value.pg,
            fee_payment_gateway: formData.value.pgFee,
          };

          await ApiService.put("bank-transfer/rekening", save).then((data) => {
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
                emit("reloadList", props.filterList);
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
        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const closeImage = () => {
      detailImage.value.showImage = false;
      detailImage.value.name = "";
    };

    const CopyEvent = (data, act) => {
      if (act == "bank") {
        formData.value.optionsBank.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "pg") {
        formData.value.optionsPg.forEach((val: any) => {
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
      countries,
      Multiselect,
      Copy,
      saveImage,
      CopyEvent,
      // pg,
      pgFee,
      image,
      detailImage,
      displayImage,
      closeImage,
    };
  },
});
</script>
