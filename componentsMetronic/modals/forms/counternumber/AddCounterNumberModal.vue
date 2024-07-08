<template>
  <div
    class="modal fade"
    id="kt_modal_add_counternumber"
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
        <div class="modal-header" id="kt_modal_add_counternumber_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Counter Number</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_counternumber_close"
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
              id="kt_modal_add_counternumber_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_counternumber_header"
              data-kt-scroll-wrappers="#kt_modal_add_counternumber_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Counter</label
                  >

                  <el-form-item prop="counter_code">
                    <el-input
                      v-model="formData.counter_code"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          counter_desc.focus();
                        }
                      "
                    />
                    <span class="errMessageCustom">{{
                      errorMessage["counter_code"]
                    }}</span>
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Keterangan Counter</label
                  >
                  <el-form-item prop="counter_desc">
                    <el-input
                      v-model="formData.counter_desc"
                      ref="counter_desc"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          initial_number.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Initial Number</label>

                  <el-form-item prop="initial_number">
                    <el-input
                      v-model="formData.initial_number"
                      ref="initial_number"
                      type="number"
                      placeholder="Initial Number"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          running_number.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jumlah Running Number</label
                  >
                  <el-form-item prop="running_number">
                    <el-input
                      v-model="formData.running_number"
                      ref="running_number"
                      type="number"
                      placeholder="Running Number"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          prefix.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-12 fv-row">
                  <label class="fs-12 fw-semobold mb-2">Prefix</label>
                  <el-form-item prop="prefix">
                    <el-input
                      v-model="formData.prefix"
                      ref="prefix"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          f_company_code.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tampilkan Kode Company</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid mt-2"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      ref="f_company_code"
                      value=""
                      id="flexSwitchChecked"
                      @click="
                        () => {
                          formData.f_company_code = !formData.f_company_code;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_company_code ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tampilkan Plant Code</label
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
                      @click="
                        () => {
                          formData.f_plant_code = !formData.f_plant_code;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_plant_code ? "NO" : "YES" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <br />
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tampilkan Bulan</label
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
                      @click="
                        () => {
                          formData.f_bulan = !formData.f_bulan;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_bulan ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <!--begin::Col-->
                <div class="col-md-8 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Format Bulan</label
                  >

                  <Multiselect
                    v-model="formData.format_bulan"
                    :searchable="false"
                    :close-on-select="true"
                    :groups="true"
                    :options="formData.optionBulan"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                </div>
                <!--end::Col-->
                <!--end::Input group-->
              </div>

              <br />
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tampilkan Tahun</label
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
                      :checked="formData.f_tahun"
                      @click="
                        () => {
                          formData.f_tahun = !formData.f_tahun;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_tahun ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Col-->
                <div class="col-md-8 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Format Tahun</label
                  >

                  <Multiselect
                    v-model="formData.format_tahun"
                    :searchable="true"
                    :close-on-select="false"
                    :groups="true"
                    :options="formData.optionTahun"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                </div>
                <!--end::Col-->
              </div>
              <br />
              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Multiple Prefix</label
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
                      @click="
                        () => {
                          formData.f_multiple_prefix =
                            !formData.f_multiple_prefix;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.f_multiple_prefix ? "NO" : "YES" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-8 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Multiple Prefix</label
                  >
                  <Multiselect
                    v-model="formData.multiple_prefix"
                    :searchable="false"
                    :close-on-select="true"
                    :groups="true"
                    :options="formData.optionPrefix"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                </div>
                <!--end::Input group-->
              </div>
              <br />
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-singlevoucher-modal",
  components: { Multiselect },
  props: ["formValue"],
  emits: ["reload"],
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const counter_desc = ref();
    const running_number = ref();
    const initial_number = ref();
    const prefix = ref();
    const multiple_prefix = ref();
    const f_company_code = ref();
    const f_plant_code = ref();
    const f_tahun = ref();
    const f_bulan = ref();
    const format_tahun = ref();
    const format_bulan = ref();
    const f_multiple_prefix = ref();

    const formData = ref({
      kode: [],
      ownership: "",
      counter_desc: "",
      counter_code: "",
      running_number: "",
      initial_number: "",
      prefix: "",
      multiple_prefix: "",
      f_company_code: false,
      f_plant_code: true,
      f_tahun: false,
      f_bulan: false,
      format_tahun: "",
      format_bulan: "",
      f_multiple_prefix: true,
      registrasi: true,
      dump_pos: true,
      member: false,
      email: false,
      HP: false,
      code_kerjasama: "",
      issue_day: "0",
      min_transaction: "",
      imagepath: [],
      image: "",
      company: "",
      bisnis: "",
      sales_org: "",
      sales_org_id: "",
      salesorg: "",
      voucher_group: "",
      voucher_group_id: "",
      companyvalue: "",
      voucher_id: "",
      bisnis_id: "",
      editModal: true,
      company_id: "",
      optionsCompany: [],
      optionsSalesorg: [],
      optionsVoucher: [],
      optionsBisnis: [],
      milik: "",
      tahun: "",
      bulan: "",
      expiry: "",
      discount_v: "0",
      kerjasama: false,
      issued: false,
      subs: false,
      generate: false,
      type_amount: false,
      optionTahun: [
        {
          options: [
            {
              value: "YYYY",
              label: "YYYY",
            },
            {
              value: "YY",
              label: "YY",
            },
          ],
        },
      ],
      optionBulan: [
        {
          options: [
            {
              value: "MM",
              label: "MM",
            },
            {
              value: "M",
              label: "M",
            },
          ],
        },
      ],
      optionPrefix: [
        {
          options: [
            {
              value: "SO",
              label: "SO",
            },
            {
              value: "OT",
              label: "OT",
            },
          ],
        },
      ],
      optionsMilik: [
        {
          options: [
            {
              value: "Milik sendiri",
              label: "Milik Sendiri",
            },
            {
              value: "Milik luar",
              label: "Milik Luar",
            },
          ],
        },
      ],
      fJual: false,
      skuVoucher: "",
      optionsSKuVoucher: [],
    });

    const voucerList: any = ref([]);
    let salesorgList: any = [];
    let bisnisList: any = [];
    let milikList: any = formData.value.optionsMilik;

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

      await ApiService.get("sales-organisasi")
        .then((data) => {
          data.data.data.forEach((val) => {
            salesorgList.push({
              value: val.sales_org_id,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get("bisnis-unit")
        .then((data) => {
          data.data.data.forEach((val) => {
            bisnisList.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      let skuList: any = [];
      await ApiService.get("material").then((data) => {
        data.data.data.forEach((element, key) => {
          if (element.class_code != null) {
            skuList.push({
              value: element.material_id,
              label: `${element.material_code} - ${element.material_desc}`,
            });
          }
        });
      });

      formData.value.optionsSKuVoucher = skuList;
      formData.value.optionsCompany = companyList;
      formData.value.optionsSalesorg = salesorgList;
      formData.value.optionsBisnis = bisnisList;
    });

    const rules = ref({
      counter_code: [
        {
          required: true,
          message: "Kode Counter is required",
          trigger: "change",
        },
      ],
      counter_desc: [
        {
          required: true,
          message: "Keterangan Counter is required",
          trigger: "change",
        },
      ],
      running_number: [
        {
          required: true,
          message: "Jumlah Running Number is required",
          trigger: "change",
        },
      ],
    });

    const saveImage = (event) => {
      console.log(event.target.files[0]);

      formData.value.imagepath = event.target.files[0];
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
            counter_code: formData.value.counter_code.toUpperCase(),
            counter_desc: formData.value.counter_desc.toUpperCase(),
            prefix: formData.value.prefix.toUpperCase(),
            f_company_code: formData.value.f_company_code ? "YES" : "NO",
            f_plant_code: formData.value.f_plant_code ? "YES" : "NO",
            f_tahun: formData.value.f_tahun ? "YES" : "NO",
            f_bulan: formData.value.f_bulan ? "YES" : "NO",
            f_multiple_prefix: formData.value.f_multiple_prefix ? "YES" : "NO",
            format_tahun: formData.value.format_tahun,
            format_bulan: formData.value.format_bulan,
            multiple_prefix: formData.value.multiple_prefix,
            running_number: formData.value.running_number,
            initial_number: formData.value.initial_number,
          };

          let save = await ApiService.post("counter-number", saveData).then(
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
                  submitButtonRef.value.disabled = false;

                  hideModal(addFormModalRef.value);
                  emit("reload");
                });
              } else if (data.data.status_code == 400) {
                data.data.errors.forEach((val) => {
                  errorMessage.value[val.path] = val.msg;
                });
                loading.value = false;
                hideModal(addFormModalRef.value);
                submitButtonRef.value.disabled = false;
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
              }
            }
          );
        }
      });
    };

    watch(props, (newVal) => {
      formRef?.value?.resetFields();
      formData.value = {
        ...formData.value,
        ...newVal.formValue,
      };
      errorMessage.value = [];
    });

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
      saveImage,
      Copy,
      counter_desc,
      running_number,
      initial_number,
      prefix,
      multiple_prefix,
      f_company_code,
      f_plant_code,
      f_tahun,
      f_bulan,
      format_tahun,
      format_bulan,
      f_multiple_prefix,
      errorMessage,
    };
  },
});
</script>
