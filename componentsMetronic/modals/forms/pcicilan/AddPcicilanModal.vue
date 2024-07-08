<template>
  <div
    class="modal fade"
    id="kt_modal_add_pcicilan"
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
        <div class="modal-header" id="kt_modal_add_pcicilan_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            Add Maintenance Minimal Purchase Untuk Cicilan
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_merchant_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="
              () => {
                formRef?.resetFields();
                formData.errMinimal = false;
                formData.errTermin = false;
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
              id="kt_modal_add_merchant_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_merchant_header"
              data-kt-scroll-wrappers="#kt_modal_add_merchant_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-6">
                  <label class="required fs-6 fw-semobold mb-2">Company</label>

                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    label="label"
                    @click="CopyEvent(formData.company, 'company')"
                    @keydown.enter.prevent="
                      () => {
                        bunit.focus();
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <div class="col-6">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Bisnis unit</label
                  >

                  <el-form-item prop="bunit">
                    <Multiselect
                      v-model="formData.bunit"
                      ref="bunit"
                      :searchable="true"
                      :groups="true"
                      :options="formData.optionsBuinit"
                      mode="tags"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      @keydown.enter.prevent="
                        () => {
                          cabang.focus();
                        }
                      "
                      :disabled="formData.bunit.length > 1 ? false : true"
                    ></Multiselect
                  ></el-form-item>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-4">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Proses Di Mesin</label
                  >
                  <el-form-item prop="proses_mesin">
                    <Multiselect
                      v-model="formData.proses_mesin"
                      ref="proses_mesin"
                      :searchable="true"
                      :options="formData.optionsProses"
                      placeholder="Proses Mesin"
                      @keydown.enter.prevent="
                        () => {
                          merchant.focus();
                        }
                      "
                      disabled
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4">
                  <label class="fs-6 fw-semobold mb-2">Merchant</label>
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
                          mesin.focus();
                        }
                      "
                      disabled
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4">
                  <label class="fs-6 fw-semobold mb-2">Penyedia Mesin</label>
                  <el-form-item prop="mesin">
                    <Multiselect
                      v-model="formData.mesin"
                      ref="mesin"
                      :searchable="true"
                      :options="formData.optionsMesin"
                      placeholder="Penyedia Mesin"
                      @keydown.enter.prevent="
                        () => {
                          kdCardCenter.focus();
                        }
                      "
                      disabled
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-4">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Card center</label
                  >
                  <el-form-item prop="kdCardCenter">
                    <Multiselect
                      v-model="formData.kdCardCenter"
                      ref="kdCardCenter"
                      :searchable="true"
                      :options="formData.optionsKdCardCenter"
                      placeholder="Select"
                      @click="CopyEvent(formData.kdCardCenter, 'kdCardCenter')"
                      @keydown.enter.prevent="
                        () => {
                          tglBerlaku.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tanggal Berlaku</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="tglBerlaku">
                    <el-date-picker
                      v-model="formData.tglBerlaku"
                      type="daterange"
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      value-format="YYYY-MM-DD"
                      @change="datePicked($event)"
                      ref="tglBerlaku"
                      @click="CopyEvent(formData.tglBerlaku, 'tglBerlaku')"
                      @keydown.enter.prevent="
                        () => {
                          termin.focus();
                        }
                      "
                    >
                    </el-date-picker>
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="table-responsive mb-4">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="fw-bold fs-6 text-gray-800">
                        <th>Termin</th>
                        <th>Minimal Purchase</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row, index) in formData.pushTermin"
                        :key="index"
                        v-show="index > 0"
                      >
                        <td>{{ row.termin }}</td>
                        <td>{{ addSeparator(row.minimal_purchase) }}</td>
                        <td v-show="index > 0">
                          <button
                            type="button"
                            class="btn btn-sm"
                            @click="delMapTermin(row.id)"
                          >
                            <i class="fa fa-trash" style="color: red"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-5 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Termin</label>
                  <el-form-item prop="termin">
                    <el-input
                      v-model="formData.termin"
                      type="number"
                      ref="termin"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          minimal_purchase.focus();
                        }
                      "
                    />
                    <span class="errMessageCustom" v-if="formData.errTermin"
                      >Termin is required</span
                    >
                  </el-form-item>
                </div>
                <div class="col-5 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Minimal Purchase</label
                  >

                  <el-form-item prop="minimal_purchase">
                    <el-input
                      data-type="currency"
                      v-model="formData.minimal_purchase"
                      type="text"
                      ref="minimal_purchase"
                      @keyup="formatNumber"
                      @click="Copy($event.srcElement.value)"
                    />
                    <span class="errMessageCustom" v-if="formData.errMinimal"
                      >Minimal Purchase is required</span
                    >
                  </el-form-item>
                </div>
                <div class="col-1">
                  <div class="fv-row mt-8">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="pushTermin()"
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr />
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";
import moment from "moment";
import {
  company,
  merchantStore,
  bunitStore,
  ProsesmesinStore,
  mesinStore,
} from "@/stores/company";

export default defineComponent({
  name: "add-pcicilan-modal",
  components: { Multiselect },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const submitButtonRef = ref<any | HTMLButtonElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const bunit = ref();
    const kdJnsKartu = ref();
    const kdCardCenter = ref();
    const discRate = ref();
    const fee = ref();
    const status = ref();
    const cabang = ref();
    const feeTermin = ref();
    const discRateTermin = ref();
    const tglBerlaku = ref();
    const minimal_purchase = ref();
    const penyedia_mesin = ref();
    const proses_mesin = ref();
    const termin = ref();
    const mesin = ref();
    const merchant = ref();
    const formData = ref({
      merchant: {},
      optionsMerchant: [],
      optionsCompany: [],
      company: {},
      jurnalCode: "",
      minimal_purchase: "0",
      optionsBuinit: [],
      bunit: [],
      cabang: [],
      optionsCabang: [],
      tglBerlaku: "",
      status: true,
      optionsKdCardCenter: [],
      kdCardCenter: "",
      kdJnsKartu: "",
      edc_id: "",
      optionsKdJnsKartu: [],
      pushTermin: [
        {
          id: 0,
          termin: 0,
          minimal_purchase: "0",
        },
      ],
      feeTermin: 0,
      discRateTermin: 0,
      termin: "0",
      proses_mesin: {},
      optionsProses: [],
      mesin: {},
      optionsMesin: [],
      errTermin: false,
      errMinimal: false,
    });

    watch(
      () => [
        company.list,
        merchantStore.list,
        bunitStore.list,
        ProsesmesinStore.list,
        mesinStore.list,
      ],
      (list) => {
        formData.value.company = list[0];
        formData.value.merchant = list[1];
        formData.value.bunit = list[2];
        formData.value.proses_mesin = list[3];
        formData.value.mesin = list[4];
      }
    );

    onMounted(async () => {
      let merchant: any = [];
      await ApiService.get("merchant").then((data) => {
        data.data.data.forEach((val) => {
          merchant.push({
            value: val.merchant_id,
            label: val.merch_name,
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

      let buinitList: any = [];
      await ApiService.get("bisnis-unit")
        .then((data) => {
          data.data.data.forEach((val) => {
            buinitList.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit_code + "-" + val.bisnis_unit,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      let mapPush: any = [
        {
          label: "Select All",
          options: buinitList,
        },
      ];

      formData.value.optionsBuinit = mapPush;

      let cabang: any = [];
      await ApiService.get("cabang").then((data) => {
        data.data.data.forEach((val) => {
          cabang.push({
            value: val.cabang_id,
            label: val.plant.plant_name,
          });
        });
      });

      let mapPushCabang: any = [
        {
          label: "Select All",
          options: cabang,
        },
      ];
      formData.value.optionsCabang = mapPushCabang;

      let jnsKartu: any = [];
      await ApiService.get("jenis-kartu").then((data) => {
        data.data.data.forEach((val) => {
          jnsKartu.push({
            value: val.jenis_kartu_id,
            label: val.jenis_kartu,
          });
        });
      });
      formData.value.optionsKdJnsKartu = jnsKartu;

      let kdCardCenter: any = [];
      await ApiService.get("card-center").then((data) => {
        data.data.data.forEach((val) => {
          kdCardCenter.push({
            value: val.card_center_id,
            label: val.card_center_name,
          });
        });
      });
      formData.value.optionsKdCardCenter = kdCardCenter;

      let proses_mesin: any = [];
      await ApiService.get(
        "penunjang?master_name=Tujuan permintaan mesin"
      ).then((data) => {
        data.data.data.forEach((val) => {
          proses_mesin.push({
            value: val.value1,
            label: val.value1,
          });
        });
      });
      formData.value.optionsProses = proses_mesin;

      let mesin: any = [];
      await ApiService.get("share-edc").then((data) => {
        data.data.data.forEach((val) => {
          mesin.push({
            value: val.edc_id,
            label: val.nama_mesin,
          });
        });
      });
      formData.value.optionsMesin = mesin;
    });

    const datePicked = (event) => {
      console.log(
        "The first date is" + event[0] + "and the second date is" + event[1]
      );
    };

    const rules = ref({
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      tglBerlaku: [
        {
          required: true,
          message: "Tanggal berlaku is required",
          trigger: "change",
        },
      ],
      jurnalCode: [
        {
          required: true,
          message: "jurnalCode is required",
          trigger: "change",
        },
      ],
      kdCardCenter: [
        {
          required: true,
          message: "Card Center is required",
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

      //Disable button
      submitButtonRef.value.disabled = true;

      formRef.value.validate(async (valid: boolean) => {
        if (formData.value.pushTermin.length == 1) {
          formData.value.errTermin = true;
          formData.value.errMinimal = true;
        }
        if (valid) {
          loading.value = true;

          let termin: any = [];
          formData.value.pushTermin.forEach((val: any, key: number) => {
            if (key > 0) {
              termin.push({
                termin: val.termin,
                minimal_purchase: val.minimal_purchase,
              });
            }
          });

          let bisnis: any = [];
          formData.value.bunit.forEach((data) => {
            bisnis.push({
              bisnis_unit: data,
            });
          });

          const save = {
            /*tgl_berlaku: moment(formData.value.tglBerlaku, "YYYY-MM-DD").format(
            "YYYY-MM-DD"),*/
            tgl_berlaku: formData.value.tglBerlaku,
            company_id: formData.value.company,
            merchant_id: formData.value.merchant,
            bisnis_unit: bisnis,
            penyedia_mesin: formData.value.mesin,
            card_center_id: formData.value.kdCardCenter,
            proses_mesin: formData.value.proses_mesin,
            minimal_purchase: termin,
          };

          await ApiService.post("purchase", save).then((data) => {
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
                formRef?.value?.resetFields();
                formData.value.errTermin = false;
                formData.value.errMinimal = false;
                submitButtonRef.value.disabled = false;
                emit("reloadList");
                // window.location.reload();
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
              loading.value = false;
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
              loading.value = false;
              submitButtonRef.value.disabled = false;
              return false;
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
      } else if (act == "kdCardCenter") {
        formData.value.optionsKdCardCenter.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "kdJnsKartu") {
        formData.value.optionsKdJnsKartu.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      }
    };

    const pushTermin = () => {
      if (formData.value.pushTermin.length > 0) {
        formData.value.pushTermin.forEach((val) => {
          if (formData.value.termin == val.termin) {
            delMapTermin(val.id);

            return;
          }
        });
      }

      formData.value.pushTermin.push({
        id: formData.value.pushTermin.length + 1,
        termin: formData.value.termin,
        minimal_purchase: formData.value.minimal_purchase.replace(/\./g, ""),
      });
      formData.value.termin = "0";
      formData.value.minimal_purchase = "0";
    };

    const delMapTermin = (key) => {
      var index = formData.value.pushTermin
        .map((x) => {
          return x.id;
        })
        .indexOf(key);

      formData.value.pushTermin.splice(index, 1);
    };

    const addSeparator = (val) => {
      return val
        .toString()
        .replace(/[^0-9]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const formatNumber = (e) => {
      const val = e.target.value.replace(/^0+/, "");
      formData.value.minimal_purchase = addSeparator(val);
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
      bunit,
      moment,
      kdJnsKartu,
      kdCardCenter,
      discRate,
      fee,
      tglBerlaku,
      status,
      cabang,
      pushTermin,
      feeTermin,
      discRateTermin,
      delMapTermin,
      termin,
      penyedia_mesin,
      minimal_purchase,
      proses_mesin,
      mesin,
      datePicked,
      formatNumber,
      addSeparator,
    };
  },
});
</script>
