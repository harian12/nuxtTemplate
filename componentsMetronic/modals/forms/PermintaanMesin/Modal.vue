<template>
  <div
    class="modal fade"
    id="kt_modal_req_mesin"
    ref="addModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_req_mesin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ formData.viewText }} Permintaan pemasangan mesin
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_req_mesin_close"
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
              id="kt_modal_req_mesin_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_req_mesin_header"
              data-kt-scroll-wrappers="#kt_modal_req_mesin_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Company</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      disabled
                    ></Multiselect>
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Tujuan permintaan mesin</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.tujuan"
                      :searchable="true"
                      :options="formData.optionsTujuan"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      disabled
                    ></Multiselect>
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Merchant</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.merchant"
                      :searchable="true"
                      :options="formData.optionsMerchant"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      disabled
                    ></Multiselect>
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Penyedia mesin share</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.penyedia"
                      :searchable="true"
                      :options="formData.optionsPenyedia"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      disabled
                    ></Multiselect>
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Tanggal request</label
                    >
                    <!--end::Label-->
                    <el-form-item prop="tglRequest">
                      <el-input
                        v-model="formData.tglRequest"
                        type="text"
                        ref="durasi"
                        @click="Copy($event.srcElement.value)"
                        class="is-disabled"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Tanggal Rencana Pemasangan</label
                    >
                    <!--end::Label-->

                    <el-form-item prop="tglPemasangan">
                      <el-input
                        v-model="formData.tglPemasangan"
                        type="date"
                        ref="durasi"
                        @click="
                          Copy(
                            moment($event.srcElement.value).format('DD-MM-YYYY')
                          )
                        "
                        :class="{ 'is-disabled': formData.viewText == 'View' }"
                        @keydown.enter.prevent="
                          () => {
                            upload.focus();
                          }
                        "
                        max="9999-12-31"
                        :min="new Date().toISOString().substr(0, 10)"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="col-4" style="width: 4%">Plant</div>
                <div class="col-8" style="width: 96%"><hr /></div>
                <div class="col-12" v-if="formData.viewText != 'View'">
                  <div class="row">
                    <div class="col-11" style="padding-left: 13px !important">
                      <label class="required fs-6 fw-semobold mb-2"
                        >Upload Data Plant</label
                      >
                      <el-form-item prop="file">
                        <div class="input-group custom-file-button">
                          <input
                            type="file"
                            class="form-control form-select-sm"
                            accept=".xlsx"
                            @change="saveXlsx($event)"
                            ref="upload"
                            id="inputGroupFile"
                            @keydown.enter.prevent="
                              () => {
                                kodePlant.focus();
                              }
                            "
                          />
                        </div>
                        <span
                          v-if="formData.errorUploadData != ''"
                          style="color: red"
                          v-html="formData.errorUploadData"
                        ></span>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 d-flex justify-content-end"
                  v-if="formData.viewText != 'Add'"
                >
                  <a
                    :href="formData.urlDownload"
                    class="btn btn-danger btn-sm"
                    target="_blank"
                    :class="{ disabled: formData.exportDisabled }"
                    ><span v-if="!formData.exportDisabled"
                      ><i class="fa fa-download"></i>Export</span
                    >
                    <span
                      v-else
                      class="spinner-border spinner-border-sm align-center"
                    ></span
                  ></a>
                </div>
                <div class="col-12">
                  <h3>Detail Plant</h3>
                  <div class="table-responsive mb-4">
                    <table class="table table-bordered">
                      <thead>
                        <tr class="fw-bold fs-6 text-gray-800">
                          <th>Kode Plant</th>
                          <th>Bisnis Unit</th>
                          <th>Nama Plant</th>
                          <th>Mesin yang diminta</th>
                          <th>Status</th>
                          <th v-if="formData.viewText != 'View'">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in formData.pushPlant"
                          :key="index"
                        >
                          <td v-if="row.kode != ''" @click="changeRow(index)">
                            {{ row.kode }}
                          </td>
                          <td v-if="row.kode != ''" @click="changeRow(index)">
                            {{ row.bunitName }}
                          </td>
                          <td v-if="row.kode != ''" @click="changeRow(index)">
                            {{ row.namePlant }}
                          </td>
                          <td v-if="row.kode != ''" @click="changeRow(index)">
                            {{ row.mesin }}
                          </td>
                          <td v-if="row.kode != ''" @click="changeRow(index)">
                            {{ row.status }}
                          </td>
                          <td
                            v-if="row.kode != '' && formData.viewText != 'View'"
                            @click="changeRow(index)"
                          >
                            <button
                              type="button"
                              class="btn btn-light"
                              @click="delPlant(row.kode)"
                            >
                              <i class="fa fa-trash" style="color: red"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="row" v-if="formData.viewText != 'View'">
                  <div class="col-12">
                    <h4>Form Input Plant</h4>
                    <hr />
                  </div>
                  <div class="col-4">
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-semobold mb-2 required"
                        >Kode Plant</label
                      >
                      <!--end::Label-->

                      <Multiselect
                        v-model="formData.kodePlant"
                        :searchable="true"
                        :options="formData.optionsPlant"
                        placeholder="Select"
                        ref="kodePlant"
                        @change="
                        ($event) => {
                          formData.allPlant.forEach((val: any) => {
                            if (val.plant_code == $event) {
                              formData.namaPlant = val.plant_name
                            }
                          });
                        }
                      "
                        @keydown.enter.prevent="
                          () => {
                            bunit.focus();
                          }
                        "
                        @click="
                          () => {
                            formData.allPlant.forEach((val: any) => {
                            if (val.plant_code == formData.kodePlant) {
                              Copy(`${val.plant_code}-${val.plant_name}`)
                            }
                          });
                          }
                        "
                      ></Multiselect>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-semobold mb-2 required"
                        >Bisnis Unit</label
                      >
                      <!--end::Label-->

                      <Multiselect
                        v-model="formData.bunit"
                        :searchable="true"
                        :options="formData.optionsBuinit"
                        placeholder="Select"
                        ref="bunit"
                        @change="($event) => {
                        formData.allBunit.forEach((val: any) => {
                          if (val.bisnis_unit_id == $event) {
                            formData.bunitName = val.bisnis_unit
                          }
                        })
                      }"
                        @keydown.enter.prevent="
                          () => {
                            mesin.focus();
                          }
                        "
                        @click="
                          () => {
                            formData.allBunit.forEach((val: any) => {
                            if (val.bisnis_unit_id == formData.bunit) {
                              Copy(`${val.bisnis_unit_code}-${val.bisnis_unit}`)
                            }
                          });
                          }
                        "
                      ></Multiselect>
                    </div>
                  </div>
                  <div class="col-4 mb-2 fv-row">
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Plant</label
                    >
                    <el-form-item prop="namaPlant">
                      <el-input
                        v-model="formData.namaPlant"
                        type="text"
                        class="is-disabled"
                        readonly
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-4 mb-2 fv-row">
                    <label class="required fs-6 fw-semobold mb-2"
                      >Jumlah Mesin yang Diminta</label
                    >
                    <el-form-item prop="namaPlant">
                      <el-input
                        v-model="formData.reqMesin"
                        type="number"
                        ref="mesin"
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-4 mb-2 fv-row">
                    <label class="required fs-6 fw-semobold mb-2">Status</label>
                    <el-form-item prop="namaPlant">
                      <el-input
                        v-model="formData.status"
                        type="text"
                        class="is-disabled"
                        readonly
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-12 d-flex justify-content-end">
                    <button
                      type="button"
                      class="btn btn-outline btn-outline btn-outline-danger btn-active--danger btn-sm"
                      @click="pushPlant('del')"
                    >
                      <i class="fa fa-times"></i>
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="pushPlant()"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div
            class="modal-footer flex-center"
            v-if="formData.viewText != 'View'"
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
import Copy from "../../../../helper/coppied";
import Multiselect from "@vueform/multiselect";
import VueDatePicker from "@vuepic/vue-datepicker";
import moment from "moment";
import * as XLSX from "xlsx";

export default defineComponent({
  name: "add-company-modal",
  components: {
    Multiselect,
    VueDatePicker,
  },
  props: {
    inputData: Object,
    optData: Object,
    reloadList: Function,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const upload = ref();
    const kodePlant = ref();
    const bunit = ref();
    const mesin = ref();
    let formData = ref({
      company: "",
      viewText: "",
      tujuan: "",
      merchant: "",
      penyedia: "",
      tglPemasangan: "",
      filePlant: new FileReader(),
      kodePlant: "",
      namaPlant: "",
      optionsPlant: [],
      tglRequest: moment(new Date()).format("DD/MM/YYYY"),
      optionsCompany: [],
      optionsTujuan: [],
      optionsMerchant: [],
      optionsPenyedia: [],
      optionsBuinit: [],
      reqMesin: "0",
      bunit: "",
      allPlant: [],
      status: "Request",
      pushPlant: [
        {
          kode: "",
          bunit: "",
          bunitName: "",
          namePlant: "",
          mesin: "",
          status: "",
        },
      ],
      bunitName: "",
      allBunit: [],
      changeRow: false,
      plantIndex: 0,
      reqMecId: "",
      filter: "",
      exportDisabled: true,
      urlDownload: "#",
      errorUploadData: "",
    });

    watch(
      () => [
        JSON.parse(JSON.stringify(props.inputData)),
        JSON.parse(JSON.stringify(props.optData)),
      ],
      (val) => {
        if (val[1].action == "Add") {
          formRef?.value?.resetFields();
          formData.value.company = val[0].company;
          formData.value.tujuan = val[0].tujuan;
          formData.value.merchant = val[0].merchant;
          formData.value.penyedia = val[0].penyedia;
        } else {
          formData.value.company = val[1].company;
          formData.value.tujuan = val[1].tujuan;
          formData.value.merchant = val[1].merchant;
          formData.value.penyedia = val[1].penyedia;
          formData.value.reqMecId = val[1].reqMecId;
          formData.value.tglRequest = val[1].tglRequest;
          if (val[1].pushPlant.length > 0) {
            exportData(formData.value.reqMecId);
          }
        }

        formData.value.tglPemasangan = val[1].tglPemasangan;
        formData.value.pushPlant = val[1].pushPlant;
        formData.value.filter = val[0].filter;
        formData.value.viewText = val[1].action;

        if (formData.value.company != undefined) {
          changePlant(formData.value.company);
        }
      }
    );

    onMounted(() => {
      getListModal();
    });

    const getListModal = async () => {
      let companyList: any = [];
      let tujuan: any = [];
      let penyedia: any = [];
      let merchant: any = [];
      let bunit: any = [];
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

      await ApiService.get("penunjang?master_name=Tujuan%20permintaan%20mesin")
        .then((data) => {
          data.data.data.forEach((val) => {
            tujuan.push(val.value1);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get("share-edc?search[status]=Active")
        .then((data) => {
          data.data.data.forEach((val) => {
            penyedia.push({
              value: val.edc_id,
              label: val.nama_mesin,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get("merchant").then((data) => {
        data.data.data.forEach((val) => {
          merchant.push({
            value: val.merchant_id,
            label: val.merch_name,
          });
        });
      });

      await ApiService.get("bisnis-unit")
        .then((data) => {
          data.data.data.forEach((val) => {
            bunit.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit_code + "-" + val.bisnis_unit,
            });
          });
          formData.value.allBunit = data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });

      formData.value.optionsMerchant = merchant;
      formData.value.optionsPenyedia = penyedia;
      formData.value.optionsCompany = companyList;
      formData.value.optionsTujuan = tujuan;
      formData.value.optionsBuinit = bunit;
    };

    const changePlant = async (id) => {
      let plant: any = [];
      await ApiService.get(`cabang?company_id=${id}`).then((data) => {
        let allPlant: any = [];
        data.data.data.forEach((el) => {
          plant.push({
            value: el.plant.plant_code,
            label: `${el.plant.plant_code} - ${el.plant.plant_name}`,
          });
          allPlant.push(el.plant);
        });

        formData.value.allPlant = allPlant;
      });
      formData.value.optionsPlant = plant;
    };

    const exportData = async (id) => {
      let params = {
        request_machine_id: id,
      };
      formData.value.exportDisabled = true;
      await ApiService.post("request-machine/export", params).then((data) => {
        if (data.data.status_code == 200) {
          if (data.data.data.url != "" && data.data.data.url != null) {
            formData.value.exportDisabled = false;
            formData.value.urlDownload = "http://" + data.data.data.url;
          }
        }
      });
    };

    const rules = ref({
      company: [
        {
          required: true,
          message: "Companyis required",
          trigger: "change",
        },
      ],
      tujuan: [
        {
          required: true,
          message: "Tujuan is required",
          trigger: "change",
        },
      ],
      merchant: [
        {
          required: true,
          message: "Merchant is required",
          trigger: "change",
        },
      ],
      penyedia: [
        {
          required: true,
          message: "Penyedia is required",
          trigger: "change",
        },
      ],
      tglPemasangan: [
        {
          required: true,
          message: "Tanggal Pemasangan is required",
          trigger: "change",
        },
      ],
      tglRequest: [
        {
          required: true,
          message: "Tanggal Request is required",
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

          let plantMap: any = [];
          formData.value.pushPlant.forEach((val: any, key) => {
            if (val.kode != "") {
              plantMap.push({
                plant_code: val.kode,
                bisnis_unit_id: val.bunit,
                jumlah_mesin: val.mesin,
              });
            }
          });

          const saveData = {
            company_id: formData.value.company,
            tujuan_permintaan: formData.value.tujuan,
            merchant_id:
              formData.value.merchant == "" ? null : formData.value.merchant,
            tgl_request: moment(formData.value.tglRequest, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            tgl_rencana_pemasangan: formData.value.tglPemasangan,
            request_machine_plant: plantMap,
            edc_id:
              formData.value.penyedia == "" ? null : formData.value.penyedia,
            request_machine_id: formData.value.reqMecId,
          };

          if (formData.value.viewText == "Add") {
            await ApiService.post("request-machine", saveData).then((data) => {
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
                  hideModal(addModalRef.value);
                  emit("reloadList", formData.value.filter);
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
            await ApiService.put("request-machine", saveData).then((data) => {
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
                  hideModal(addModalRef.value);
                  emit("reloadList", formData.value.filter);
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
        }
      });
    };

    const saveXlsx = (e) => {
      var files = e.target.files;
      var i, f;
      for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target?.result;
          var wb = XLSX.read(data, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const isiData = XLSX.utils.sheet_to_json(ws, { header: 1 });

          let msg: any = "";
          let notErrorPlant = false;
          let notErrorBunit = false;
          isiData.forEach((val: any, key) => {
            let pushData: any = {
              kode: "",
              namePlant: "",
              bunit: "",
              bunitName: "",
            };

            if (key > 0 && val.length > 0) {
              notErrorPlant = false;
              formData.value.allPlant.forEach((plant: any) => {
                if (val[0] == plant.plant_code) {
                  pushData.kode = plant.plant_code;
                  pushData.namePlant = plant.plant_name;
                  notErrorPlant = true;
                  return;
                }
              });

              notErrorBunit = false;
              formData.value.allBunit.forEach((bunit: any) => {
                if (val[1] == bunit.bisnis_unit_code) {
                  pushData.bunit = bunit.bisnis_unit_id;
                  pushData.bunitName = bunit.bisnis_unit;
                  notErrorBunit = true;
                  return;
                }
              });

              pushData.mesin = "1";
              pushData.status = "Request";

              if (notErrorPlant && notErrorBunit) {
                formData.value.pushPlant.push(pushData);
              } else {
                msg += `<li style='text-aling:left'>column ${key} tidak ditemukan</li>`;
              }
            }
          });

          formData.value.errorUploadData = msg;
        };
        reader.readAsBinaryString(f);
      }
    };
    const pushPlant = (act: String = "push") => {
      if (act == "push") {
        if (formData.value.changeRow) {
          formData.value.pushPlant[formData.value.plantIndex].kode =
            formData.value.kodePlant;
          formData.value.pushPlant[formData.value.plantIndex].bunit =
            formData.value.bunit;
          formData.value.pushPlant[formData.value.plantIndex].bunitName =
            formData.value.namaPlant;
          formData.value.pushPlant[formData.value.plantIndex].namePlant =
            formData.value.namaPlant;
          formData.value.pushPlant[formData.value.plantIndex].mesin =
            formData.value.reqMesin;
          formData.value.changeRow = false;
        } else {
          if (
            formData.value.kodePlant == "" ||
            formData.value.bunit == "" ||
            formData.value.reqMesin == ""
          ) {
            return;
          }
          formData.value.pushPlant.push({
            kode: formData.value.kodePlant,
            bunit: formData.value.bunit,
            bunitName: formData.value.bunitName,
            namePlant: formData.value.namaPlant,
            mesin: formData.value.reqMesin,
            status: formData.value.status,
          });
        }

        formData.value.kodePlant = "";
        formData.value.bunit = "";
        formData.value.namaPlant = "";
        formData.value.reqMesin = "";
      } else {
        formData.value.kodePlant = "";
        formData.value.bunit = "";
        formData.value.namaPlant = "";
        formData.value.reqMesin = "";
        formData.value.changeRow = false;
      }
    };

    const delPlant = (key) => {
      var index = formData.value.pushPlant
        .map((x) => {
          return x.kode;
        })
        .indexOf(key);

      formData.value.pushPlant.splice(index, 1);
    };

    const changeRow = (id) => {
      formData.value.kodePlant = formData.value.pushPlant[id].kode;
      formData.value.bunit = formData.value.pushPlant[id].bunit;
      formData.value.bunitName = formData.value.pushPlant[id].bunitName;
      formData.value.namaPlant = formData.value.pushPlant[id].namePlant;
      formData.value.reqMesin = formData.value.pushPlant[id].mesin;
      formData.value.changeRow = true;
      formData.value.plantIndex = id;
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addModalRef,
      getAssetPath,
      countries,
      Copy,
      saveXlsx,
      pushPlant,
      delPlant,
      moment,
      changeRow,
      upload,
      kodePlant,
      bunit,
      mesin,
    };
  },
});
</script>
