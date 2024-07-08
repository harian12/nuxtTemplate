<template>
  <div
    class="modal fade"
    id="kt_modal_realisasi_mesin"
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
        <div class="modal-header" id="kt_modal_realisasi_mesin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ formData.viewText }} Realisasi pemasangan mesin
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_realisasi_mesin_close"
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
              id="kt_modal_realisasi_mesin_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_realisasi_mesin_header"
              data-kt-scroll-wrappers="#kt_modal_realisasi_mesin_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div
                  class="col-4 mb-4"
                  style="width: 9%"
                  v-if="formData.viewText == 'View'"
                >
                  Detail Store
                </div>
                <div
                  class="col-8 mb-4"
                  style="width: 91%"
                  v-if="formData.viewText == 'View'"
                >
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
                      @click="Copy($event.srcElement.innerText)"
                      disabled
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
                      @click="Copy($event.srcElement.innerText)"
                      disabled
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
                <div
                  class="col-4 mb-2 fv-row"
                  v-if="formData.viewText == 'Add'"
                >
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jenis / Model Mesin</label
                  >
                  <el-form-item prop="jenisMesin">
                    <el-input
                      v-model="formData.jenisMesin"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          noSeri.focus();
                        }
                      "
                      onkeyup="this.value = this.value.toUpperCase();"
                    />
                  </el-form-item>
                </div>
                <div
                  class="col-4 mb-2 fv-row"
                  v-if="formData.viewText == 'Add'"
                >
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nomor seri mesin
                  </label>
                  <el-form-item prop="noSeri">
                    <el-input
                      v-model="formData.noSeri"
                      type="number"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          tglRealisasi.focus();
                        }
                      "
                      ref="noSeri"
                    />
                  </el-form-item>
                </div>
                <div
                  class="col-4 mb-2 fv-row"
                  v-if="formData.viewText == 'Add'"
                >
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tanggal realisasi pemasangan
                  </label>
                  <el-form-item prop="tglRealisasi">
                    <el-input
                      v-model="formData.tglRealisasi"
                      type="date"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          termin.focus();
                        }
                      "
                      ref="tglRealisasi"
                    />
                  </el-form-item>
                </div>
                <div class="row" v-if="formData.viewText == 'Add'">
                  <div class="col-12">
                    <h3>Termin</h3>
                    <div class="table-responsive mb-4">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Termin</th>
                            <th>MID</th>
                            <th>TID</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(row, key) in formData.pushTermin"
                            :key="key"
                          >
                            <td v-if="row.termin != ''">{{ row.termin }}</td>
                            <td v-if="row.termin != ''">{{ row.mid }}</td>
                            <td v-if="row.termin != ''">{{ row.tid }}</td>
                            <td v-if="row.termin != ''">
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
                  </div>
                  <div class="col-4 mb-2 fv-row">
                    <label class="fs-6 fw-semobold mb-2">Termin </label>
                    <el-form-item prop="termin">
                      <el-input
                        v-model="formData.termin"
                        type="number"
                        @click="Copy($event.srcElement.value)"
                        @keydown.enter.prevent="
                          () => {
                            mid.focus();
                          }
                        "
                        ref="termin"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-3 mb-2 fv-row">
                    <label class="fs-6 fw-semobold mb-2">MID </label>
                    <el-form-item prop="mid">
                      <el-input
                        v-model="formData.mid"
                        type="number"
                        @click="Copy($event.srcElement.value)"
                        @keydown.enter.prevent="
                          () => {
                            tid.focus();
                          }
                        "
                        ref="mid"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-3 mb-2 fv-row">
                    <label class="fs-6 fw-semobold mb-2">TID </label>
                    <el-form-item prop="tid">
                      <el-input
                        v-model="formData.tid"
                        type="number"
                        @click="Copy($event.srcElement.value)"
                        ref="tid"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-2 mt-8">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="pushTermin()"
                    >
                      +Tambah
                    </button>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-12">
                    <div class="table-responsive mb-4">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Jenis Model Mesin</th>
                            <th>Nomor Seri Mesin</th>
                            <th>Tanggal Realisasi</th>
                            <th>Termin (%)</th>
                            <th>MID</th>
                            <th>TID</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(row, index) in formData.pushMesin"
                            :key="index"
                          >
                            <td v-if="row.termin != ''">
                              {{ row.jenisMesin }}
                            </td>
                            <td v-if="row.termin != ''">{{ row.noSeri }}</td>
                            <td v-if="row.termin != ''">
                              {{ row.tglRealisasi }}
                            </td>
                            <td v-if="row.termin != ''">{{ row.termin }}</td>
                            <td v-if="row.termin != ''">{{ row.mid }}</td>
                            <td v-if="row.termin != ''">{{ row.tid }}</td>
                            <td
                              v-if="
                                formData.pushMesin.length == 1 &&
                                row.termin == ''
                              "
                              colspan="6"
                              style="text-align: center"
                            >
                              Belum ada data realisasi
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
            v-if="formData.viewText == 'Add'"
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

export default defineComponent({
  name: "add-company-modal",
  components: {
    Multiselect,
    VueDatePicker,
  },
  props: {
    optData: Object,
    reloadList: Function,
    filterData: Object,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const noSeri = ref();
    const tglRealisasi = ref();
    const termin = ref();
    const mid = ref();
    const tid = ref();
    let formData = ref({
      kodePlant: "",
      namaPlant: "",
      bunit: "",
      optionsBuinit: [],
      optionsPlant: [],
      allPlant: [],
      allBunit: [],
      jenisMesin: "",
      noSeri: "",
      tglRealisasi: "",
      termin: "",
      mid: "",
      tid: "",
      pushTermin: [{ id: 0, termin: "", mid: "", tid: "" }],
      viewText: "Add",
      reqPlantId: "",
      filter: "",
      pushMesin: [
        {
          jenisMesin: "",
          noSeri: "",
          tglRealisasi: "",
          termin: "",
          mid: "",
          tid: "",
        },
      ],
    });

    watch(
      () => [
        JSON.parse(JSON.stringify(props.optData)),
        JSON.parse(JSON.stringify(props.filterData)),
      ],
      (val) => {
        formData.value.kodePlant = val[0].kodePlant;
        formData.value.bunit = val[0].bunit;
        formData.value.namaPlant = val[0].namaPlant;
        formData.value.viewText = val[0].viewText;
        formData.value.reqPlantId = val[0].reqPlantId;
        formData.value.filter = val[1];
        formData.value.pushMesin = val[0].pushMesin;
      }
    );

    onMounted(() => {
      getListModal();
    });

    const getListModal = async () => {
      let plant: any = [];
      let bunit: any = [];

      await ApiService.get("plant").then((data) => {
        data.data.data.forEach((el) => {
          plant.push({
            value: el.plant_code,
            label: `${el.plant_code} - ${el.plant_name}`,
          });
        });
        formData.value.allPlant = data.data.data;
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

      formData.value.optionsPlant = plant;
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
      jenisMesin: [
        {
          required: true,
          message: "Jenis Mesin is required",
          trigger: "change",
        },
      ],
      noSeri: [
        {
          required: true,
          message: "Nomor Seri is required",
          trigger: "change",
        },
      ],
      tglRealisasi: [
        {
          required: true,
          message: "Tanggal Realisasi is required",
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

          let pushTermin: any = [];
          formData.value.pushTermin.forEach((val: any) => {
            if (val.termin != "") {
              pushTermin.push({
                termin: val.termin,
                mid: val.mid,
                tid: val.tid,
              });
            }
          });
          const saveData = {
            request_machine_plant_id: formData.value.reqPlantId,
            model_mesin: formData.value.jenisMesin.toUpperCase(),
            no_seri: formData.value.noSeri,
            tgl_realisasi: formData.value.tglRealisasi,
            termin: pushTermin,
          };

          await ApiService.post("request-machine/realization", saveData).then(
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
              clearData();
            }
          );
        }
      });
    };

    const clearData = () => {
      formData.value.kodePlant = "";
      formData.value.namaPlant = "";
      formData.value.bunit = "";
      formData.value.jenisMesin = "";
      formData.value.noSeri = "";
      formData.value.tglRealisasi = "";
      formData.value.termin = "";
      formData.value.mid = "";
      formData.value.tid = "";
      formData.value.pushTermin = [{ id: 0, termin: "", mid: "", tid: "" }];
      formData.value.viewText = "Add";
      formData.value.reqPlantId = "";
      formData.value.pushMesin = [
        {
          jenisMesin: "",
          noSeri: "",
          tglRealisasi: "",
          termin: "",
          mid: "",
          tid: "",
        },
      ];
    };

    const pushTermin = () => {
      if (
        formData.value.termin == "" ||
        formData.value.mid == "" ||
        formData.value.tid == ""
      ) {
        return;
      }
      formData.value.pushTermin.push({
        id: formData.value.pushTermin.length + 1,
        termin: formData.value.termin,
        mid: formData.value.mid,
        tid: formData.value.tid,
      });

      formData.value.termin = "";
      formData.value.mid = "";
      formData.value.tid = "";
    };

    const delMapTermin = (key) => {
      var index = formData.value.pushTermin
        .map((x) => {
          return x.id;
        })
        .indexOf(key);

      formData.value.pushTermin.splice(index, 1);
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
      moment,
      noSeri,
      tglRealisasi,
      termin,
      mid,
      tid,
      pushTermin,
      delMapTermin,
    };
  },
});
</script>
