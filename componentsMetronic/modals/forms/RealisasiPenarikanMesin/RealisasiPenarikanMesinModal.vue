<template>
  <div
    class="modal fade"
    id="kt_modal_realisasi_penarikan_mesin"
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
        <div
          class="modal-header"
          id="kt_modal_realisasi_penarikan_mesin_header"
        >
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{
              formData.viewText == "Update" ? "Realisasi" : "Detail realisasi"
            }}
            penarikan mesin EDC
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_realisasi_penarikan_mesin_close"
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
              id="kt_modal_realisasi_penarikan_mesin_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_realisasi_penarikan_mesin_header"
              data-kt-scroll-wrappers="#kt_modal_realisasi_penarikan_mesin_scroll"
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
                      >Nomor Request</label
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
                      >Tanggal Rencana penarikan</label
                    >
                    <!--end::Label-->

                    <el-form-item>
                      <el-input
                        v-model="formData.tglRealisasi"
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
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Diambil oleh</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.retrieval"
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
                      >Kode Plant</label
                    >
                    <!--end::Label-->

                    <div
                      class="input-group input-group-sm flex-nowrap"
                      @click="Copy(formData.kodePlant)"
                    >
                      <input
                        v-model="formData.kodePlant"
                        type="text"
                        class="form-control"
                        ref="discRate"
                        disabled
                        @click="Copy(formData.kodePlant)"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Plant</label
                    >
                    <!--end::Label-->

                    <div
                      class="input-group input-group-sm flex-nowrap"
                      @click="Copy(formData.namaPlant)"
                    >
                      <input
                        v-model="formData.namaPlant"
                        type="text"
                        class="form-control"
                        ref="discRate"
                        disabled
                        @click="Copy(formData.namaPlant)"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-4">
                  <div class="fv-row mb-15">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Bisnis Unit</label
                    >
                    <!--end::Label-->

                    <div
                      class="input-group input-group-sm flex-nowrap"
                      @click="Copy(formData.bunit)"
                    >
                      <input
                        v-model="formData.bunit"
                        type="text"
                        class="form-control"
                        ref="discRate"
                        disabled
                        @click="Copy(formData.bunit)"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <h3>Nomor Seri</h3>
                  <div class="table-responsive mb-4">
                    <table class="table table-bordered">
                      <thead>
                        <tr class="fw-bold fs-6 text-gray-800">
                          <th>Nomor Seri</th>
                          <th>TID</th>
                          <th>MID</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template
                          v-for="(rowPlant, indexPlant) in formData.detailPlant"
                          :key="indexPlant"
                        >
                          <tr
                            v-for="(row, rowPlantId) in rowPlant.machine
                              ?.mid_tid"
                            :key="rowPlantId"
                          >
                            <td>
                              {{ rowPlant?.machine?.no_seri ?? "-" }}
                            </td>
                            <td>{{ row.tid }}</td>
                            <td>{{ row.mid }}</td>
                            <td>{{ rowPlant.machine.status }}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
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
    let formData: any = ref({
      company: "",
      viewText: "",
      retrieval: "",
      merchant: "",
      penyedia: "",
      tglPenarikan: "",
      tglRealisasi: "",
      filePlant: new FileReader(),
      kodePlant: "",
      namaPlant: "",
      detailPlant: [],
      optionsPlant: [],
      tglRequest: moment().format("DD/MM/YYYY"),
      optionsCompany: [],
      optionsTujuan: [],
      optionsMerchant: [],
      optionsPenyedia: [],
      optionsBuinit: [],
      optionsMesin: [],
      nomorSeriMesin: "",
      machineId: "",
      mid: "",
      tid: "",
      bunit: "",
      allPlant: [],
      status: "Request",
      pushPlant: [
        {
          kode: "",
          bunit: "",
          bunitName: "",
          namePlant: "",
          nomorSeriMesin: "",
          machineId: "",
          tid: "",
          mid: "",
          status: "",
        },
      ],
      bunitName: "",
      allBunit: [],
      changeRow: false,
      plantIndex: 0,
      machineRetrievalId: "",
      filter: "",
    });

    watch(
      () => [
        JSON.parse(JSON.stringify(props.inputData)),
        JSON.parse(JSON.stringify(props.optData)),
      ],
      (val) => {
        console.log("val", val);

        if (val[1].action == "Add") {
          formData.value.company = val[0].company;
          formData.value.retrieval = val[0].retrieval;
          formData.value.merchant = val[0].merchant;
          formData.value.penyedia = val[0].penyedia;
          formData.value.tglPenarikan = "";
          formData.value.pushPlant = [];
        } else {
          formData.value.company = val[1].company;
          formData.value.retrieval = val[1].retrieval;
          formData.value.merchant = val[1].merchant;
          formData.value.penyedia = val[1].penyedia;
          formData.value.tglRequest = val[1].tglRequest;
          formData.value.tglPenarikan = val[1].tglPenarikan;
          formData.value.tglRealisasi = val[1].tglPenarikan;
          formData.value.pushPlant = val[1].pushPlant;
          formData.value.machineRetrievalId = val[1].machineRetrievalId;
          formData.value.kodePlant = val[1].kodePlant;
          formData.value.namaPlant = val[1].namaPlant;
          formData.value.bunit = val[1].bunit;
          formData.value.detailPlant = val[1].detailPlant;
        }

        formData.value.filter = val[0].filter;
        formData.value.viewText = val[1].action;
      }
    );

    onMounted(() => {
      getListModal();
    });

    const getListModal = async () => {
      let companyList: any = [];
      let retrieval: any = [];
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
            retrieval.push(val.value1);
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
      formData.value.optionsTujuan = retrieval;
      formData.value.optionsBuinit = bunit;
    };
    const rules = ref({
      company: [
        {
          required: true,
          message: "Companyis required",
          trigger: "change",
        },
      ],
      retrieval: [
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
      tglPenarikan: [
        {
          required: true,
          message: "Tanggal penarikan is required",
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
            machine_retrieval_noseri_id:
              formData.value.detailPlant[0].machine_retrieval_noseri_id,
            tgl_realisasi: formData.value.tglRealisasi,
          };

          await ApiService.put("machine-retrieval/realization", saveData).then(
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
            }
          );
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

          isiData.forEach((val: any, key) => {
            let pushData: any = {
              kode: "",
              namePlant: "",
              bunit: "",
              bunitName: "",
            };
            if (key > 0 && val.length > 0) {
              formData.value.allPlant.forEach((plant: any) => {
                if (val[0] == plant.plant_code) {
                  pushData.kode = plant.plant_code;
                  pushData.namePlant = plant.plant_name;
                } else {
                  return;
                }
              });

              formData.value.allBunit.forEach((bunit: any) => {
                if (val[1] == bunit.bisnis_unit) {
                  pushData.bunit = bunit.bisnis_unit;
                  pushData.bunitName = bunit.bisnis_unit;
                } else {
                  return;
                }
              });

              const machineDetail = formData.value.optionsMesin
                .map((x) => x.fullValue)
                .find((x) => x.no_seri == val[2]);

              pushData.nomorSeriMesin = val[2];
              pushData.mid = machineDetail
                ? machineDetail.mid_tid.map((x) => x.mid).join(", ")
                : "Not Found";
              pushData.tid = machineDetail
                ? machineDetail.mid_tid.map((x) => x.tid).join(", ")
                : "Not Found";

              pushData.status = "Request";

              formData.value.pushPlant.push(pushData);
            }
          });
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
            formData.value.nomorSeriMesin.machine_id;
          formData.value.changeRow = false;
        } else {
          if (
            formData.value.kodePlant == "" ||
            formData.value.bunit == "" ||
            formData.value.nomorSeriMesin == ""
          ) {
            return;
          }
          formData.value.pushPlant.push({
            kode: formData.value.kodePlant,
            bunit: formData.value.bunit,
            bunitName: formData.value.bunitName,
            namePlant: formData.value.namaPlant,
            nomorSeriMesin: formData.value.nomorSeriMesin,
            mid: formData.value.mid,
            tid: formData.value.tid,
            status: formData.value.status,
            machineId: formData.value.machineId,
          });
        }

        formData.value.kodePlant = "";
        formData.value.bunit = "";
        formData.value.namaPlant = "";
        formData.value.nomorSeriMesin = "";
        formData.value.mid = "";
        formData.value.tid = "";
      } else {
        formData.value.kodePlant = "";
        formData.value.bunit = "";
        formData.value.namaPlant = "";
        formData.value.nomorSeriMesin = "";
        formData.value.mid = "";
        formData.value.tid = "";
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
      formData.value.nomorSeriMesin = formData.value.pushPlant[id].mesin;
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
