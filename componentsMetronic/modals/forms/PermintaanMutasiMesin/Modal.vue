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
            {{ formData.viewText }} Permintaan mutasi mesin
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
                <div class="col-4" style="width: 9%">Detail Store</div>
                <div class="col-8" style="width: 91%"><hr /></div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Company</label
                    >
                    <!--end::Label-->
                    <el-form-item prop="company">
                      <Multiselect
                        v-model="formData.company"
                        :searchable="true"
                        :options="formData.optionsCompany"
                        placeholder="Select"
                        @click="Copy($event.srcElement.innerText)"
                        disabled
                      ></Multiselect>
                    </el-form-item>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Bisnis Unit</label
                    >
                    <!--end::Label-->
                    <el-form-item prop="bunit">
                      <Multiselect
                        v-model="formData.bunit"
                        :searchable="true"
                        :options="formData.optionsBuinit"
                        placeholder="Select"
                        @change="
                          ($event) => {
                            formData.bunit = $event;
                          }
                        "
                        @click="
                          () => {
                            CopyEvent(formData.bunit, 'bunit');
                            valGet = 0;
                          }
                        "
                        :disabled="formData.viewText != 'Add'"
                        @keydown.enter.prevent="
                          () => {
                            plantAsal.focus();
                          }
                        "
                      ></Multiselect>
                    </el-form-item>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Kode Asal Plant</label
                    >
                    <!--end::Label-->
                    <el-form-item prop="plantAsal">
                      <Multiselect
                        v-model="formData.plantAsal"
                        :searchable="true"
                        :options="formData.optionsPlant"
                        placeholder="Select"
                        @change="($event) => {
                        formData.spanAsal =false
                        formData.spanTujuan = false
                        if ($event == formData.plantTujuan) {
                          formData.spanAsal =true
                          formData.spanTujuan = true
                          return false;
                        }
                        formData.allPlant.forEach((val: any) => {
                           if (val.plant_code == $event) {
                              formData.namaPlantAsal = val.plant_name
                            }
                            formData.plantAsal = $event
                        })
                        getMapPlant()
                      }"
                        @click="
                          () => {
                            CopyEvent(formData.plantAsal, 'plant');
                            valGet = 0;
                          }
                        "
                        ref="plantAsal"
                        :disabled="formData.viewText != 'Add'"
                        @keydown.enter.prevent="
                          () => {
                            plantTujuan.focus();
                          }
                        "
                      ></Multiselect>
                    </el-form-item>

                    <span v-if="formData.spanAsal" style="color: red"
                      >Plant asal tidak boleh sama dengan plant tujuan</span
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Asal Plant</label
                    >
                    <!--end::Label-->

                    <el-form-item prop="namaPlantAsal">
                      <el-input
                        v-model="formData.namaPlantAsal"
                        type="text"
                        @click="Copy($event.srcElement.value)"
                        class="is-disabled"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Kode Tujuan Plant</label
                    >
                    <!--end::Label-->
                    <el-form-item prop="plantTujuan">
                      <Multiselect
                        v-model="formData.plantTujuan"
                        :searchable="true"
                        :options="formData.optionsPlant"
                        placeholder="Select"
                        @change="($event) => {
                        formData.spanTujuan =false
                         formData.spanAsal =false
                        if ($event == formData.plantAsal) {
                          formData.spanTujuan =true
                          formData.spanAsal = true
                          return false;
                        }
                        formData.allPlant.forEach((val: any) => {
                           if (val.plant_code == $event) {
                              formData.namaPlantTujuan = val.plant_name
                            }
                            formData.plantTujuan = $event 
                        })
                        getMapPlant()
                      }"
                        @click="
                          () => {
                            CopyEvent(formData.plantTujuan, 'plant');
                            valGet = 0;
                          }
                        "
                        :disabled="formData.viewText != 'Add'"
                        ref="plantTujuan"
                        @keydown.enter.prevent="
                          () => {
                            tglRencanaMutasi.focus();
                          }
                        "
                      ></Multiselect>
                    </el-form-item>

                    <span v-if="formData.spanTujuan" style="color: red"
                      >Plant tujuan tidak boleh sama dengan plant asal</span
                    >
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama Tujuan Plant</label
                    >
                    <!--end::Label-->

                    <el-form-item prop="namaPlantTujuan">
                      <el-input
                        v-model="formData.namaPlantTujuan"
                        type="text"
                        @click="Copy($event.srcElement.value)"
                        class="is-disabled"
                        readonly
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="col-4" style="width: 10%">Detail Mesin</div>
                <div class="col-8" style="width: 90%"><hr /></div>
                <div class="col-5 mb-4" v-if="formData.viewText != 'View'">
                  <h4>Detail Mesin Plant Asal</h4>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="width: 130%">
                      <thead>
                        <tr>
                          <th>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="changePlant(null, 'asal')"
                              v-model="formData.boolCheckAsal"
                              :disabled="formData.viewText == 'View'"
                            />
                          </th>
                          <th>Share Mesin</th>
                          <th>Merchant</th>
                          <th>Share Mesin</th>
                          <th>Pakai ECR</th>
                          <th>MID</th>
                          <th>TID</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, key) in formData.pushPlantAsal"
                          :key="key"
                        >
                          <td v-if="row.mesinId != ''">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="changePlant(key, 'asal')"
                              :checked="formData.checkPlantAsal.includes(key)"
                              :disabled="formData.viewText == 'View'"
                            />
                          </td>
                          <td v-if="row.mesinId != ''">{{ row.shareMesin }}</td>
                          <td v-if="row.mesinId != ''">
                            {{ row.merchant }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            {{ row.share }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            {{ row.ecr }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            <span v-html="row.mid"></span>
                          </td>
                          <td v-if="row.mesinId != ''">
                            <span v-html="row.tid"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-2" v-if="formData.viewText != 'View'">
                  <div
                    class="row"
                    style="padding: 70px 0"
                    v-if="formData.viewText != 'View'"
                  >
                    <div class="col-12 mb-4">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="pindahTujuan()"
                      >
                        Tambah&nbsp;<i class="fa fa-angle-double-right"></i>
                      </button>
                    </div>
                    <div class="col-12">
                      <button
                        type="button"
                        class="btn btn-outline btn-outline btn-outline-danger btn-active-light-danger btn-sm"
                        @click="pindahAsal()"
                      >
                        <i class="fa fa-angle-double-left" color="red"></i
                        >&nbsp;&nbsp;&nbsp; Hapus
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  :class="
                    formData.viewText == 'View' ? 'col-12 mb-4' : 'col-5 mb-4'
                  "
                >
                  <h4>Detail Mesin Plant Tujuan</h4>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="width: 140%">
                      <thead>
                        <tr>
                          <th>
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="changePlant(null, 'tujuan')"
                              v-model="formData.boolCheckTujuan"
                              :disabled="formData.viewText == 'View'"
                            />
                          </th>
                          <th>Share Mesin</th>
                          <th>Merchant</th>
                          <th>Share Mesin</th>
                          <th>Pakai ECR</th>
                          <th>MID</th>
                          <th>TID</th>
                          <th>Flag</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, key) in formData.pushPlantTujuan"
                          :key="key"
                        >
                          <td v-if="row.mesinId != ''">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @click="changePlant(key, 'tujuan')"
                              :checked="formData.checkPlantTujuan.includes(key)"
                              :disabled="
                                row.flag != 'New' || formData.viewText == 'View'
                              "
                            />
                          </td>
                          <td v-if="row.mesinId != ''">{{ row.shareMesin }}</td>
                          <td v-if="row.mesinId != ''">
                            {{ row.merchant }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            {{ row.share }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            {{ row.ecr }}
                          </td>
                          <td v-if="row.mesinId != ''">
                            <span v-html="row.mid"></span>
                          </td>
                          <td v-if="row.mesinId != ''">
                            <span v-html="row.tid"></span>
                          </td>
                          <td v-if="row.mesinId != ''">{{ row.flag }}</td>
                        </tr>
                      </tbody>
                    </table>
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
                      >Tanggal Rencana Mutasi</label
                    >
                    <!--end::Label-->

                    <el-form-item prop="tglRencanaMutasi">
                      <el-input
                        v-model="formData.tglRencanaMutasi"
                        type="date"
                        ref="tglRencanaMutasi"
                        @click="
                          Copy(
                            moment($event.srcElement.value).format('DD-MM-YYYY')
                          )
                        "
                        :class="{ 'is-disabled': formData.viewText == 'View' }"
                        max="9999-12-31"
                        :min="new Date().toISOString().substr(0, 10)"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Status</label>
                  <el-form-item prop="status">
                    <el-input
                      v-model="formData.status"
                      type="text"
                      class="is-disabled"
                      readonly
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
<style>
table td:last-child {
  position: relative;
  right: 0;
  text-align: left !important;
}

table th:last-child {
  position: relative;
  right: 0;
  text-align: left !important;
}
</style>
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
    const plantAsal = ref();
    const plantTujuan = ref();
    const tglRencanaMutasi = ref();
    let formData = ref({
      company: "",
      viewText: "",
      plantAsal: "",
      plantTujuan: "",
      optionsCompany: [],
      optionsPlant: [],
      optionsBuinit: [],
      bunit: "",
      namaPlantAsal: "",
      namaPlantTujuan: "",
      tglRequest: moment().format("DD/MM/YYYY"),
      tglRencanaMutasi: "",
      status: "Request",
      filter: "",
      allPlant: [],
      pushPlantAsal: [
        {
          mesinId: "",
          merchant: "",
          shareMesin: "",
          ecr: "",
          share: "",
          mid: "",
          tid: "",
          flag: "",
        },
      ],
      spanTujuan: false,
      spanAsal: false,
      pushPlantTujuan: [
        {
          mesinId: "",
          merchant: "",
          shareMesin: "",
          ecr: "",
          share: "",
          mid: "",
          tid: "",
          flag: "",
        },
      ],
      checkPlantAsal: <any>[],
      checkPlantTujuan: <any>[],
      boolCheckAsal: false,
      boolCheckTujuan: false,
      id: "",
      btnDisabled: false,
    });

    const valGet = ref<Number>(0);
    watch(
      () => [
        JSON.parse(JSON.stringify(props.inputData)),
        JSON.parse(JSON.stringify(props.optData)),
      ],
      (val) => {
        formData.value.company = val[0].company;
        if (val[1].action != "Add") {
          formData.value.company = val[1].company;
        }
        if (val[1].action == "Add") {
          valGet.value = 0;
        }
        formData.value.plantAsal = val[1].plantAsal;
        formData.value.plantTujuan = val[1].plantTujuan;
        formData.value.namaPlantAsal = val[1].namaPlantAsal;
        formData.value.namaPlantTujuan = val[1].namaPlantTujuan;
        formData.value.bunit = val[1].bunit;
        formData.value.filter = val[0].filter;
        formData.value.viewText = val[1].action;
        formData.value.tglRencanaMutasi = val[1].tglRencanaMutasi;
        formData.value.btnDisabled = val[0].btnDisabled;

        if (
          val[1].pushPlantAsal.length > 0 ||
          val[1].pushPlantTujuan.length > 0
        ) {
          valGet.value = 1;
        }

        formData.value.pushPlantAsal = val[1].pushPlantAsal;

        formData.value.pushPlantTujuan = val[1].pushPlantTujuan;
        formData.value.id = val[1].id;

        if (formData.value.company != undefined) {
          changePlantList(formData.value.company);
        }
      }
    );

    onMounted(() => {
      getListModal();
    });

    const getMapPlant = () => {
      if (
        formData.value.plantAsal != "" &&
        formData.value.bunit != "" &&
        formData.value.plantTujuan != "" &&
        formData.value.plantAsal != undefined &&
        formData.value.bunit != undefined &&
        formData.value.plantTujuan != undefined
      ) {
        formData.value.pushPlantAsal = [];
        formData.value.pushPlantTujuan = [];
        if (valGet.value == 0) {
          listDetailPlant();
          valGet.value = 1;
        }
      }
    };

    const listDetailPlant = async () => {
      await ApiService.get(
        `machine?plant_code=${formData.value.plantAsal}&bisnis_unit_id=${formData.value.bunit}`
      ).then((data) => {
        data.data.data.forEach((val: any) => {
          let mapMid: any = "<ul>";

          val.mid_tid.forEach((val) => {
            mapMid += `<li>${val.mid}</li>`;
          });
          mapMid += "</ul>";

          let mapTid: any = "<ul>";

          val.mid_tid.forEach((val) => {
            mapTid += `<li>${val.tid}</li>`;
          });
          mapTid += "</ul>";
          if (val.merchant != null) {
            formData.value.pushPlantAsal.push({
              mesinId: val.machine_id,
              merchant: val.merchant.merch_name,
              shareMesin: "",
              ecr: val.merchant.ecr,
              share: val.merchant.share,
              mid: mapMid,
              tid: mapTid,
              flag: "",
            });
          }

          if (val.share_edc != null) {
            formData.value.pushPlantAsal.push({
              mesinId: val.machine_id,
              merchant: "",
              shareMesin: val.share_edc.nama_mesin,
              ecr: "",
              share: "",
              mid: mapMid,
              tid: mapTid,
              flag: "",
            });
          }
        });
      });

      await ApiService.get(
        `machine?plant_code=${formData.value.plantTujuan}&bisnis_unit_id=${formData.value.bunit}`
      ).then((data) => {
        data.data.data.forEach((val: any) => {
          let mapMid: any = "<ul>";

          val.mid_tid.forEach((val) => {
            mapMid += `<li>${val.mid}</li>`;
          });
          mapMid += "</ul>";

          let mapTid: any = "<ul>";

          val.mid_tid.forEach((val) => {
            mapTid += `<li>${val.tid}</li>`;
          });
          if (val.merchant != null) {
            formData.value.pushPlantTujuan.push({
              mesinId: val.machine_id,
              merchant: val.merchant.merch_name,
              shareMesin: "",
              ecr: val.merchant.ecr,
              share: val.merchant.share,
              mid: mapMid,
              tid: mapTid,
              flag: "",
            });
          }

          if (val.share_edc != null) {
            formData.value.pushPlantTujuan.push({
              mesinId: val.machine_id,
              merchant: "",
              shareMesin: val.share_edc.nama_mesin,
              ecr: "",
              share: "",
              mid: mapMid,
              tid: mapTid,
              flag: "",
            });
          }
        });
      });
    };

    const changePlantList = async (id) => {
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

    const getListModal = async () => {
      let companyList: any = [];
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

      await ApiService.get("bisnis-unit")
        .then((data) => {
          data.data.data.forEach((val) => {
            bunit.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit_code + "-" + val.bisnis_unit,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      formData.value.optionsCompany = companyList;
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
      plantAsal: [
        {
          required: true,
          message: "Plant Asal is required",
          trigger: "change",
        },
      ],
      plantTujuan: [
        {
          required: true,
          message: "Plant Tujuan is required",
          trigger: "change",
        },
      ],
      bunit: [
        {
          required: true,
          message: "Bisnis Unit is required",
          trigger: "change",
        },
      ],
      tglRequest: [
        {
          required: true,
          message: "Tanggal Rencana Mutasi is required",
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

          let plantAsal: any = [];
          let plantTujuan: any = [];

          formData.value.pushPlantAsal.forEach((val: any) => {
            plantAsal.push({
              machine: val.mesinId,
            });
          });

          formData.value.pushPlantTujuan.forEach((val: any) => {
            if (val.flag == "New") {
              plantTujuan.push({
                machine: val.mesinId,
              });
            }
          });

          const saveData = {
            company_id: formData.value.company,
            plant_asal: formData.value.plantAsal,
            plant_tujuan: formData.value.plantTujuan,
            bisnis_unit_id: formData.value.bunit,
            tgl_request: moment(formData.value.tglRequest, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            tgl_rencana_mutasi: formData.value.tglRencanaMutasi,
            mesin_plant_asal: plantAsal,
            mesin_plant_tujuan: plantTujuan,
            machine_mutation_id: formData.value.id,
          };

          if (formData.value.viewText == "Add") {
            await ApiService.post("machine-mutation", saveData).then((data) => {
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
                  if (!formData.value.btnDisabled) {
                    emit("reloadList", formData.value.filter);
                  }
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
            await ApiService.put("machine-mutation", saveData).then((data) => {
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
                  if (!formData.value.btnDisabled) {
                    emit("reloadList", formData.value.filter);
                  }
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

    const delPlantAsal = (key) => {
      console.log(key);
      var index = formData.value.pushPlantAsal
        .map((x) => {
          return x.mesinId;
        })
        .indexOf(key);

      formData.value.pushPlantAsal.splice(index, 1);
    };

    const delPlantTujuan = (key) => {
      var index = formData.value.pushPlantTujuan
        .map((x) => {
          return x.mesinId;
        })
        .indexOf(key);

      formData.value.pushPlantTujuan.splice(index, 1);
    };

    const changePlant = (key: any, act) => {
      if (key != null) {
        if (act == "tujuan") {
          if (formData.value.checkPlantTujuan.includes(key)) {
            var index = formData.value.checkPlantTujuan
              .map((x) => {
                return x;
              })
              .indexOf(key);

            formData.value.checkPlantTujuan.splice(index, 1);
          } else {
            formData.value.checkPlantTujuan.push(key);
          }
        } else {
          if (formData.value.checkPlantAsal.includes(key)) {
            var index = formData.value.checkPlantAsal
              .map((x) => {
                return x;
              })
              .indexOf(key);

            formData.value.checkPlantAsal.splice(index, 1);
          } else {
            formData.value.checkPlantAsal.push(key);
          }
        }
      } else {
        if (act == "tujuan") {
          formData.value.boolCheckTujuan = !formData.value.boolCheckTujuan;

          formData.value.pushPlantTujuan.forEach((val, key) => {
            if (formData.value.boolCheckTujuan) {
              if (val.flag == "New") {
                formData.value.checkPlantTujuan.push(key);
              }
            } else {
              formData.value.checkPlantTujuan = [];
            }
          });
        } else {
          formData.value.boolCheckAsal = !formData.value.boolCheckAsal;

          formData.value.pushPlantAsal.forEach((val, key) => {
            if (formData.value.boolCheckAsal) {
              formData.value.checkPlantAsal.push(key);
            } else {
              formData.value.checkPlantAsal = [];
            }
          });
        }
      }
    };

    const pindahTujuan = () => {
      let keyMesin: any = [];
      formData.value.checkPlantAsal.forEach((val) => {
        if (formData.value.pushPlantAsal[val].mesinId != "") {
          formData.value.pushPlantAsal[val].flag = "New";
          formData.value.pushPlantTujuan.push(
            formData.value.pushPlantAsal[val]
          );
          keyMesin.push(formData.value.pushPlantAsal[val].mesinId);
        }
      });

      keyMesin.forEach((val: any) => {
        delPlantAsal(val);
      });

      formData.value.boolCheckAsal = false;
      formData.value.boolCheckTujuan = false;
      formData.value.checkPlantAsal = [];
    };

    const pindahAsal = () => {
      let keyMesin: any = [];

      formData.value.checkPlantTujuan.forEach((val) => {
        formData.value.pushPlantAsal.push(formData.value.pushPlantTujuan[val]);
        keyMesin.push(formData.value.pushPlantTujuan[val].mesinId);
      });

      keyMesin.forEach((val: any) => {
        delPlantTujuan(val);
      });

      formData.value.boolCheckAsal = false;
      formData.value.boolCheckTujuan = false;
      formData.value.checkPlantTujuan = [];
    };

    const CopyEvent = (data, act) => {
      if (act == "bunit") {
        formData.value.optionsBuinit.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      }

      if (act == "plant") {
        formData.value.optionsPlant.forEach((val: any) => {
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
      addModalRef,
      getAssetPath,
      countries,
      Copy,
      delPlantAsal,
      delPlantTujuan,
      moment,
      upload,
      kodePlant,
      bunit,
      mesin,
      listDetailPlant,
      changePlant,
      pindahTujuan,
      pindahAsal,
      getMapPlant,
      valGet,
      plantTujuan,
      plantAsal,
      tglRencanaMutasi,
      CopyEvent,
    };
  },
});
</script>
