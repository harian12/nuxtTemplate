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
          <h2 class="fw-bold">
            Add Master discount rate per jenis kartu ( Offline store )
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_merchant_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="formRef?.resetFields()"
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
                <div class="col-4" style="width: 9%">Detail Store</div>
                <div class="col-8" style="width: 91%"><hr /></div>
                <div class="col-6 mb-2 fv-row">
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
                          bunit.focus();
                        }
                      "
                      @change="
                        ($event) => {
                          formData.company = $event;
                          changeCabang();
                        }
                      "
                      disabled
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
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
                          tglBerlaku.focus();
                        }
                      "
                      :disabled="formData.bunit.length < 2 ? true : false"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-6 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tanggal berlaku</label
                  >
                  <el-form-item prop="tglBerlaku">
                    <el-input
                      v-model="formData.tglBerlaku"
                      type="date"
                      ref="tglBerlaku"
                      @click="
                        Copy(moment($event.target.value).format('DD-MM-YYYY'))
                      "
                      @keydown.enter.prevent="
                        () => {
                          status.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <!--begin::Input group-->
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
                      v-model="formData.status"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.status ? "Active" : "Inactive" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->

                <div class="col-4 mb-2 mt-4" style="width: 6%">Cabang</div>
                <div class="col-8 mt-4" style="width: 94%"><hr /></div>
                <div class="col-1 mt-2">
                  <label for="">Search</label>
                </div>
                <div class="col-4">
                  <el-form-item>
                    <el-input
                      v-model="formData.searchCabang"
                      type="text"
                      ref="cabang"
                      @keydown.enter.prevent="
                        () => {
                          merchant.focus();
                        }
                      "
                      @keyup="changeCabang()"
                    />
                  </el-form-item>
                </div>
                <div class="col-12">
                  <div class="table-responsive" style="height: 150px">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="pushCabang(undefined)"
                              v-model="formData.checkAllCabang"
                            />
                          </th>
                          <th>Kode Plant</th>
                          <th>Nama Plant</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, key) in formData.optionsCabang"
                          :key="key"
                        >
                          <td>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="pushCabang(row.id)"
                              :checked="formData.checkCabang.includes(row.id)"
                            />
                          </td>
                          <td>{{ row.kode }}</td>
                          <td>{{ row.name }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-12">
                  <div class="col-12"></div>
                </div>
                <div class="col-4 mb-2 mt-4" style="width: 12%">
                  Detail Discount
                </div>
                <div class="col-8 mt-4" style="width: 88%"><hr /></div>
                <div class="col-3 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Merchant</label>
                  <el-form-item prop="merchant"
                    ><Multiselect
                      v-model="formData.merchant"
                      ref="merchant"
                      :searchable="true"
                      :options="formData.optionsMerchant"
                      placeholder="Select"
                      @click="CopyEvent(formData.merchant, 'merchant')"
                      @keydown.enter.prevent="
                        () => {
                          kdJnsKartu.focus();
                        }
                      "
                      disabled
                    ></Multiselect
                  ></el-form-item>
                </div>

                <div class="col-2 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Jenis kartu</label
                  >
                  <el-form-item prop="kdJnsKartu">
                    <Multiselect
                      v-model="formData.kdJnsKartu"
                      ref="kdJnsKartu"
                      :searchable="true"
                      :options="formData.optionsKdJnsKartu"
                      placeholder="Select"
                      @click="CopyEvent(formData.kdJnsKartu, 'kdJnsKartu')"
                      @keydown.enter.prevent="
                        () => {
                          kdCardCenter.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-2 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Card center</label
                  >
                  <el-form-item prop="kdCardCenter">
                    <Multiselect
                      v-model="formData.kdCardCenter"
                      ref="kdCardCenter"
                      :searchable="true"
                      :options="formData.optionsKdCardCenter"
                      placeholder="Select"
                      @click="CopyEvent(formData.merchant, 'kdCardCenter')"
                      @keydown.enter.prevent="
                        () => {
                          discRate.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-3 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Disc rate</label
                  >
                  <el-form-item prop="discRate">
                    <el-input
                      v-model="formData.discRate"
                      type="text"
                      ref="discRate"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          fee.focus();
                        }
                      "
                      @keyup="
                        changeFieldNumber(
                          $event.target.value,
                          'discRate',
                          'perc'
                        )
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-2 mb-2 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Fee</label>
                  <el-form-item prop="fee">
                    <el-input
                      v-model="formData.fee"
                      type="text"
                      ref="fee"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          termin.focus();
                        }
                      "
                      @keyup="changeFieldNumber($event.target.value)"
                    />
                  </el-form-item>
                </div>
                <div class="table-responsive mb-4">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="fw-bold fs-6 text-gray-800">
                        <th>Termin</th>
                        <th>Discount Rate</th>
                        <th>Fee</th>
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
                        <td>{{ row.discRate }}</td>
                        <td>{{ row.fee }}</td>
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
                <div class="col-3 mb-2 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Termin</label>
                  <el-form-item prop="termin">
                    <el-input
                      v-model="formData.termin"
                      type="number"
                      ref="termin"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          discRateTermin.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Disc rate </label>
                  <el-form-item prop="discRateTermin">
                    <el-input
                      v-model="formData.discRateTermin"
                      type="text"
                      ref="discRateTermin"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          feeTermin.focus();
                        }
                      "
                      @keyup="
                        changeFieldNumber(
                          $event.target.value,
                          'discRateTermin',
                          'perc'
                        )
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Fee</label>
                  <el-form-item prop="fee">
                    <el-input
                      v-model="formData.feeTermin"
                      type="text"
                      ref="feeTermin"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          tglBerlaku.focus();
                        }
                      "
                      @keyup="
                        changeFieldNumber($event.target.value, 'feeTermin')
                      "
                    />
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
import { company, merchantStore, bunitStore } from "@/stores/company";
import discRateHelper from "@/helper/discRate";

export default defineComponent({
  name: "add-merchant-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const merchant = ref();
    const bunit = ref();
    const kdJnsKartu = ref();
    const kdCardCenter = ref();
    const discRate = ref();
    const fee = ref();
    const status = ref();
    const tglBerlaku = ref();
    const cabang = ref();
    const feeTermin = ref();
    const discRateTermin = ref();
    const termin = ref();
    const formData = ref({
      merchant: {},
      optionsMerchant: [],
      optionsCompany: [],
      company: "",
      jurnalCode: "",
      discRate: "0",
      optionsBuinit: [],
      bunit: [],
      cabang: <any>[],
      optionsCabang: <any>[],
      fee: "0",
      tglBerlaku: "",
      status: true,
      optionsKdCardCenter: [],
      kdCardCenter: "",
      kdJnsKartu: "",
      optionsKdJnsKartu: [],
      pushTermin: [
        {
          id: 0,
          termin: 0,
          discRate: "0",
          fee: "0",
        },
      ],
      feeTermin: "0",
      discRateTermin: "0",
      termin: 0,
      searchCabang: "",
      checkCabang: <any>[],
      checkAllCabang: false,
    });

    watch(
      () => [company.list, merchantStore.list, bunitStore.list],
      (list) => {
        formData.value.company = String(list[0]);
        formData.value.merchant = list[1];
        formData.value.bunit = list[2];
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
      await ApiService.get("bisnis-unit").then((data) => {
        data.data.data.forEach((val) => {
          buinitList.push({
            value: val.bisnis_unit_id,
            label: val.bisnis_unit_code + "-" + val.bisnis_unit,
          });
        });
      });

      let mapPush: any = [
        {
          label: "Select All",
          options: buinitList,
        },
      ];

      formData.value.optionsBuinit = mapPush;

      let jnsKartu: any = [];
      await ApiService.get("jenis-kartu?status=Active").then((data) => {
        data.data.data.forEach((val) => {
          jnsKartu.push({
            value: val.jenis_kartu_id,
            label: val.jenis_kartu,
          });
        });
      });
      formData.value.optionsKdJnsKartu = jnsKartu;

      let kdCardCenter: any = [];
      await ApiService.get("card-center?status=Active").then((data) => {
        data.data.data.forEach((val) => {
          kdCardCenter.push({
            value: val.card_center_id,
            label: val.card_center_name,
          });
        });
      });
      formData.value.optionsKdCardCenter = kdCardCenter;
    });

    const rules = ref({
      merchant: [
        {
          required: true,
          message: "Merchant Code is required",
          trigger: "change",
        },
      ],
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      cabang: [
        {
          required: true,
          message: "cabang is required",
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
      discRate: [
        {
          required: true,
          message: "Disc rate is required",
          trigger: "change",
        },
      ],
      tglBerlaku: [
        {
          required: true,
          message: "Tanggal Berlaku is required",
          trigger: "change",
        },
      ],
      kdCardCenter: [
        {
          required: true,
          message: "Kode Card Center is required",
          trigger: "change",
        },
      ],
      kdJnsKartu: [
        {
          required: true,
          message: "Kode Jenis Kartu is required",
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

          let termin: any = [];
          formData.value.pushTermin.forEach((val: any, key: number) => {
            if (key > 0) {
              termin.push({
                termin: val.termin,
                disc_rate: val.discRate.replace(",", "."),
                fee: val.fee.replace(".", ""),
              });
            }
          });

          let bisnis: any = [];
          formData.value.bunit.forEach((data) => {
            bisnis.push({
              bisnis_unit: data,
            });
          });

          let cabang: any = [];
          formData.value.cabang.forEach((data) => {
            cabang.push({
              cabang: data.id,
            });
          });

          const save = {
            tgl_berlaku: formData.value.tglBerlaku,
            company_id: formData.value.company,
            merchant_id: formData.value.merchant,
            bisnis_unit: bisnis,
            cabang: cabang,
            jenis_kartu_id: formData.value.kdJnsKartu,
            card_center_id: formData.value.kdCardCenter,
            disc_rate: formData.value.discRate.replace(",", "."),
            fee: formData.value.fee.replace(".", ""),
            status: formData.value.status ? "Active" : "Inactive",
            disc_rate_off_termin: termin,
          };

          await ApiService.post("disc-rate-offline", save).then((data) => {
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
        discRate: formData.value.discRateTermin,
        fee: formData.value.feeTermin,
      });
    };

    const delMapTermin = (key) => {
      var index = formData.value.pushTermin
        .map((x) => {
          return x.id;
        })
        .indexOf(key);

      formData.value.pushTermin.splice(index, 1);
    };

    const changeFieldNumber = (val, act = "fee", format = "rp") => {
      if (format == "rp") {
        let number = val
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        if (act == "fee") {
          formData.value.fee = `${number}`;
        } else {
          formData.value.feeTermin = `${number}`;
        }
      } else {
        if (act == "discRate") {
          formData.value.discRate = discRateHelper(val);
        } else {
          formData.value.discRateTermin = discRateHelper(val);
        }
      }
    };

    const changeCabang = async () => {
      let cabang: any = [];

      if (formData.value.company == "" && formData.value.company != undefined) {
        return;
      }
      let url = `cabang?company_id=${formData.value.company}`;
      if (
        formData.value.searchCabang != "" &&
        formData.value.searchCabang.length > 2
      ) {
        url += `&search[plant_code_name]=${formData.value.searchCabang}`;
      }

      if (
        formData.value.searchCabang != "" &&
        formData.value.searchCabang.length < 2
      ) {
        return;
      }

      await ApiService.get(url).then((data) => {
        data.data.data.forEach((val) => {
          cabang.push({
            id: val.cabang_id,
            kode: val.plant.plant_code,
            name: val.plant.plant_name,
          });
        });
      });

      formData.value.optionsCabang = cabang;
    };

    const pushCabang = (key) => {
      formData.value.cabang = [];
      if (key == undefined) {
        formData.value.checkAllCabang = !formData.value.checkAllCabang;
        formData.value.optionsCabang.forEach((val: any) => {
          formData.value.checkCabang.push(val.id);
        });
        if (!formData.value.checkAllCabang) {
          formData.value.checkCabang = [];
        }
      } else {
        if (formData.value.checkCabang.includes(key)) {
          var index = formData.value.checkCabang
            .map((x) => {
              return x.id;
            })
            .indexOf(key);

          formData.value.checkCabang.splice(index, 1);
        } else {
          formData.value.checkCabang.push(key);
        }
      }

      formData.value.checkCabang.forEach((val: any) => {
        formData.value.optionsCabang.forEach((el) => {
          if (val == el.id) {
            formData.value.cabang.push(el);
          }
        });
      });
      formData.value.searchCabang = "";
      changeCabang();
    };

    const resetForm = () => {
      formRef?.value?.resetFields();
      formData.value.searchCabang = "";
      formData.value.optionsKdJnsKartu = [];
      formData.value.optionsKdCardCenter = [];
      formData.value.discRate = "0";
      formData.value.fee = "0";
      formData.value.termin = 0;
      formData.value.discRateTermin = "0";
      formData.value.feeTermin = "0";
      formData.value.checkAllCabang = false;
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
      changeFieldNumber,
      changeCabang,
      pushCabang,
      resetForm,
    };
  },
});
</script>
