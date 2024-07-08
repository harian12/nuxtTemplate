<template>
  <div
    class="modal fade"
    id="kt_modal_add_va"
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
        <div class="modal-header" id="kt_modal_add_va_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Jenis Bank Transfer Virtual Account</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_va_close"
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
              id="kt_modal_add_va_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_va_header"
              data-kt-scroll-wrappers="#kt_modal_add_va_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Company</label>
                  <el-form-item prop="company">
                    <Multiselect
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      label="label"
                      @click="Copy($event.srcElement.innerText)"
                      disabled
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Bank</label>
                  <el-form-item prop="bank">
                    <Multiselect
                      v-model="formData.bank"
                      :searchable="true"
                      :options="formData.optionsBank"
                      placeholder="Select"
                      label="label"
                      @click="CopyEvent(formData.bank, 'company')"
                      @keydown.enter.prevent="
                        () => {
                          pg.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway</label
                  >
                  <el-form-item prop="pg">
                    <Multiselect
                      v-model="formData.pg"
                      :searchable="true"
                      :options="formData.optionsPg"
                      placeholder="Select"
                      label="label"
                      ref="pg"
                      @click="CopyEvent(formData.bank, 'company')"
                      @keydown.enter.prevent="
                        () => {
                          pgFee.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Gateway Fee</label
                  >
                  <el-form-item prop="pgFee">
                    <el-input
                      v-model="formData.pgFee"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                      ref="pgFee"
                      @keydown.enter.prevent="
                        () => {
                          image.focus();
                        }
                      "
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
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <tr class="fw-bold fs-6 text-gray-800">
                        <th>Image URL</th>
                        <th>Action</th>
                      </tr>
                      <tr v-for="(row, key) in formData.file" :key="key">
                        <td v-if="row.image != ''">{{ row.image }}</td>
                        <td v-if="row.image != ''">
                          <button
                            type="button"
                            class="btn btn-light"
                            style="background-color: transparent"
                            @click="delImage(row.image)"
                          >
                            <i class="fa fa-close" style="color: red"></i>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="row">
                    <div class="col-8" style="padding-left: 13px !important">
                      <label class="required fs-6 fw-semobold mb-2"
                        >Upload File</label
                      >
                      <el-form-item prop="file">
                        <div class="input-group custom-file-button">
                          <input
                            type="file"
                            class="form-control form-select-sm"
                            accept="*"
                            @change="saveImage($event)"
                            id="inputGroupFile"
                            v-if="inputFile"
                          />
                        </div>
                        <span class="errMessageCustom" v-if="formData.errImage"
                          >Upload image is required</span
                        >
                      </el-form-item>
                    </div>
                    <div class="col-2 mt-8">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="saveTable()"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
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
import { defineComponent, onMounted, ref, watch, nextTick } from "vue";
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
    dataSend: Object,
    reloadList: Function,
    filterList: String,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const pg = ref();
    const pgFee = ref();
    const image = ref();
    const formData = ref({
      optionsCompany: [],
      company: "",
      bank: "",
      optionsBank: [],
      pg: "",
      optionsPg: [],
      file: <any>[],
      image: {
        name: "",
      },
      pgFee: "",
      rekId: "",
      errImage: false,
    });

    watch(
      () => JSON.parse(JSON.stringify(props.dataSend)),
      (send) => {
        formData.value.company = String(send[0].companyId);
        formData.value.rekId = String(send[0].id);
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

      await ApiService.get("penunjang?code_penunjang_id=669886").then(
        (data) => {
          data.data.data.forEach((val) => {
            pg.push({
              value: val.value1,
              label: val.value1,
            });
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
          message: "Bank is required",
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

    const inputFile = ref(true);

    const resetForm = async () => {
      inputFile.value = false;
      await nextTick();
      inputFile.value = true;
      // Reset field by rerender field
    };

    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const saveTable = async () => {
      if(formData.value.file.length > 0){
        formData.value.file = <any>[];
      }
      if (formData.value.image.name) {
        formData.value.file.push({
          image: formData.value.image.name,
          file: formData.value.image,
          matId: "",
        });
        inputFile.value = false;
        await nextTick();
        inputFile.value = true;
      } else {
        Swal.fire({
          text: "Please input image",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
      console.log(formData.value.file);
    };

    const delImage = async (key) => {
      let index = formData.value.file
        .map((x) => {
          return x.image;
        })
        .indexOf(key);

      formData.value.file.splice(index, 1);
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

      formRef.value.validate(async (valid: boolean) => {
        if (formData.value.file.length == 0) {
          formData.value.errImage = true;
        }
        if (valid) {
          loading.value = true;

          const save = new FormData();
          formData.value.file.forEach((val: any) => {
            if (val.file != "") {
              save.append("image", val.file);
            }
          });
          save.append("bank_transfer_id", formData.value.rekId);
          //save.append("image", formData.value.image);
          save.append("card_center_id", formData.value.bank);
          save.append("payment_gateway", formData.value.pg);
          save.append("fee_payment_gateway", formData.value.pgFee);
          save.append("company_id", formData.value.company);

          await ApiService.post("bank-transfer/rekening", save).then((data) => {
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
        }
      });
    };

    const CopyEvent = (data, act) => {
      if (act == "payment") {
        formData.value.optionsBank.forEach((val: any) => {
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
      pg,
      pgFee,
      image,
      saveTable,
      delImage,
      inputFile,
      resetForm,
    };
  },
});
</script>
