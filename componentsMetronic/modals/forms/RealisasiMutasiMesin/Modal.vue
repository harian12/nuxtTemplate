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
          <h2 class="fw-bold">{{ formData.menuText }} mutasi mesin</h2>
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
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Bisnis Unit</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.bunit"
                      :searchable="true"
                      :options="formData.optionsBuinit"
                      placeholder="Select"
                      @click="
                        () => {
                          CopyEvent(formData.bunit, 'bunit');
                        }
                      "
                      disabled
                    ></Multiselect>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Kode Asal Plant</label
                    >
                    <!--end::Label-->

                    <Multiselect
                      v-model="formData.plantAsal"
                      :searchable="true"
                      :options="formData.optionsPlant"
                      placeholder="Select"
                      @click="
                        () => {
                          CopyEvent(formData.plantAsal, 'plant');
                        }
                      "
                      disabled
                    ></Multiselect>
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

                    <Multiselect
                      v-model="formData.plantTujuan"
                      :searchable="true"
                      :options="formData.optionsPlant"
                      placeholder="Select"
                      @click="
                        () => {
                          CopyEvent(formData.plantTujuan, 'plant');
                        }
                      "
                      disabled
                    ></Multiselect>
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
                <div class="col-12 mb-4">
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
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
                          v-for="(row, key) in formData.pushPlantTujuan"
                          :key="key"
                        >
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
                        @click="
                          Copy(
                            moment($event.srcElement.value).format('DD-MM-YYYY')
                          )
                        "
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
                      >Tanggal realisasi mutasi</label
                    >
                    <!--end::Label-->

                    <el-form-item prop="tglRealisasi">
                      <el-input
                        v-model="formData.tglRealisasi"
                        type="date"
                        @click="
                          Copy(
                            moment($event.srcElement.value).format('DD-MM-YYYY')
                          )
                        "
                        :class="{
                          'is-disabled': formData.viewText == 'View',
                        }"
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
                      @click="Copy($event.srcElement.value)"
                      readonly
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
      tglRealisasi: "",
      tglRencanaMutasi: "",
      status: "Request",
      filter: "",
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
      id: "",
      menuText: "Realisasi",
    });

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
        formData.value.plantAsal = val[1].plantAsal;
        formData.value.plantTujuan = val[1].plantTujuan;
        formData.value.namaPlantAsal = val[1].namaPlantAsal;
        formData.value.namaPlantTujuan = val[1].namaPlantTujuan;
        formData.value.bunit = val[1].bunit;
        formData.value.filter = val[0].filter;
        formData.value.viewText = val[1].action;
        formData.value.tglRencanaMutasi = val[1].tglRencanaMutasi;
        formData.value.pushPlantTujuan = val[1].pushPlantTujuan;
        formData.value.id = val[1].id;
        formData.value.tglRealisasi = val[1].tglRealisasi;
        formData.value.menuText =
          val[1].menuText == undefined ? "Realisasi" : val[1].menuText;
      }
    );

    onMounted(() => {
      getListModal();
    });

    const getListModal = async () => {
      let companyList: any = [];
      let plant: any = [];
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

      await ApiService.get("plant").then((data) => {
        data.data.data.forEach((el) => {
          plant.push({
            value: el.plant_code,
            label: `${el.plant_code} - ${el.plant_name}`,
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
        })
        .catch((error) => {
          console.log(error);
        });

      formData.value.optionsCompany = companyList;
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
            tgl_realisasi_mutasi: formData.value.tglRencanaMutasi,
            machine_mutation_id: formData.value.id,
          };

          await ApiService.put("machine-mutation/realization", saveData).then(
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
        }
      });
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
      moment,
      CopyEvent,
    };
  },
});
</script>
