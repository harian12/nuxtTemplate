<template>
  <div
    class="modal fade"
    id="kt_modal_form_jadwalsetoran"
    ref="formModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_form_jadwalsetoran_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{ formEdit ? "Update Jadwal Setoran" : "Add Jadwal Setoran" }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_form_jadwalsetoran_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="handleClose"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <div class="modal-body py-10">
            <div class="mb-2 d-flex gap-2 border-bottom">
              <div class="fv-row" :style="{ width: '300px' }">
                <label class="required fs-6 fw-semibold mb-2">Plant</label>
                <el-form-item prop="title">
                  <el-input
                    v-model="formData.title"
                    type="text"
                    placeholder=""
                    class="is-disabled"
                    readonly
                  />
                </el-form-item>
              </div>
              <div class="fv-row" :style="{ width: '300px' }">
                <label class="required fs-6 fw-semibold mb-2"
                  >Bisnis Unit</label
                >
                <el-form-item prop="title">
                  <el-input
                    v-model="formData.bisnisUnit"
                    type="text"
                    placeholder=""
                    class="is-disabled"
                    readonly
                  />
                  <!-- @click="Copy($event.srcElement.value)" -->
                </el-form-item>
              </div>
              <div class="fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2"
                  >Tanggal Berlaku (DD/MM/YYYY)</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="tgl_berlaku">
                  <el-input
                    v-model="formData.tgl_berlaku"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 335px"
                  >
                    <!-- @click="Copy($event.srcElement.value)" -->
                  </el-input>
                </el-form-item>

                <!--end::Input-->
              </div>
            </div>
            <div class="d-flex gap-2 mt-5">
              <div :style="{ minWidth: '80px' }">
                <div
                  class="d-flex align-items-end"
                  v-for="(day, idx) in days"
                  :key="day"
                  :style="{
                    minWidth: '80px',
                    height: idx === 0 ? '80px' : '50px',
                  }"
                >
                  <div class="el-form-item">
                    <label class="fs-6 fw-semobold">{{ day }} </label>
                  </div>
                </div>
              </div>
              <div style="min-width: 180px">
                <!--begin::Label-->
                <div
                  v-for="(day, idx) in days"
                  :key="idx"
                  :style="{ height: idx === 0 ? '80px' : '50px' }"
                >
                  <label v-if="idx === 0" class="required fs-6 fw-semobold mb-2"
                    >Type Setoran</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="el-form-item">
                    <el-form-item class="w-100" :prop="`${day}.type_setoran`">
                      <Multiselect
                        v-model="formData[day].type_setoran"
                        :searchable="true"
                        :options="option.setoran"
                        placeholder="Setor"
                      ></Multiselect>
                    </el-form-item>
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <div class="flex-fill">
                <!--begin::Label-->
                <div
                  v-for="(day, idx) in days"
                  :key="idx"
                  :style="{ height: idx === 0 ? '80px' : '50px' }"
                >
                  <label v-if="idx === 0" class="required fs-6 fw-semobold mb-2"
                    >Rekening</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div class="el-form-item">
                    <el-form-item
                      class="w-100"
                      :prop="`${day}.rekening_bank_id`"
                    >
                      <Multiselect
                        v-model="formData[day].rekening_bank_id"
                        :searchable="true"
                        :options="option.rekening"
                        placeholder="Rekening"
                        @select="(id, data) => handleSelect(data, day)"
                      ></Multiselect>
                    </el-form-item>
                  </div>
                </div>
                <!--end::Input-->
              </div>
              <div :style="{ minWidth: '220px' }">
                <div
                  class="d-flex align-items-end"
                  v-for="(day, idx) in days"
                  :key="idx"
                  :style="{
                    minWidth: '200px',
                    maxWidth: '200px',
                    height: idx === 0 ? '80px' : '50px',
                  }"
                >
                  <div class="el-form-item" style="width: 100%">
                    <span
                      class="fs-6 fw-semobold mb-2"
                      style="
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >{{ formData[day].atasNama }}</span
                    >
                  </div>
                </div>
              </div>
              <div :style="{ minWidth: '170px' }">
                <div
                  :style="{
                    height: idx === 0 ? '80px' : '50px',
                  }"
                  v-for="(day, idx) in days"
                  :key="idx"
                >
                  <!--begin::Label-->
                  <label v-if="idx === 0" class="required fs-6 fw-semobold mb-2"
                    >Nomor Kartu CDM</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item :prop="`${day}.no_kartu_cdm`">
                    <el-input
                      v-model="formData[day].no_kartu_cdm"
                      type="number"
                      placeholder=""
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
              <div :style="{ maxWidth: '100px' }">
                <div
                  :style="{
                    height: idx === 0 ? '80px' : '50px',
                  }"
                  v-for="(day, idx) in days"
                  :key="idx"
                >
                  <!--begin::Label-->
                  <label v-if="idx === 0" class="required fs-6 fw-semobold mb-2"
                    >PIN</label
                  >
                  <!--end::Label-->
                  <!--begin::Input-->
                  <el-form-item :prop="`${day}.pin`">
                    <el-input
                      v-model="formData[day].pin"
                      type="number"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-end">
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
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import moment from "moment";
import "moment/dist/locale/id";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";

const frm = moment.weekdays().reduce((acc, val) => {
  acc[val] = {
    hari: val,
    rekening_bank_id: "",
    type_setoran: "",
    no_kartu_cdm: "",
    pin: "",
    atasNama: "-",
    bankName: "-",
  };
  return acc;
}, {});

export default defineComponent({
  name: "JadwalSetoran",
  components: {
    Multiselect,
  },
  props: ["detail", "formEdit"],
  emits: ["search-items"],
  data() {
    return {
      jadwal_setoran_cabang_id: "",
      days: moment.weekdays(),
      loading: false,
      formData: {
        title: "",
        bisnisUnit: "",
        tgl_berlaku: null,
        ...frm,
      },
      rules: {
        tgl_berlaku: [
          {
            required: true,
            message: "Required",
          },
        ],
        ...moment.weekdays().reduce((acc, val) => {
          acc[`${val}.rekening_bank_id`] = {
            required: true,
            message: "Required",
            trigger: "change",
          };
          acc[`${val}.type_setoran`] = {
            required: true,
            message: "Required",
            trigger: "change",
          };
          acc[`${val}.no_kartu_cdm`] = {
            required: true,
            message: "Required",
          };
          acc[`${val}.pin`] = {
            required: true,
            message: "Required",
          };

          return acc;
        }, {}),
      },
      option: { setoran: [], rekening: [] },
    };
  },
  created() {
    this.fetch();

    watch(
      () => JSON.stringify(this.$props.detail.jadwal_setoran),
      () => {
        const { jadwal_setoran, tgl_berlaku, jadwal_setoran_cabang_id } =
          this.$props.detail;

        this.jadwal_setoran_cabang_id = jadwal_setoran_cabang_id;

        if (jadwal_setoran[6]) {
          const jadwal = jadwal_setoran.reduce((acc, val) => {
            acc[val.hari] = {
              hari: val.hari,
              type_setoran: val.type_setoran,
              no_kartu_cdm: val.no_kartu_cdm,
              pin: val.pin,
              rekening_bank_id: val.bank.rekening_bank_id,
              atasNama: val.bank.atas_nama,
              bankName: val.bank.bank,
              jadwal_setoran: val.jadwal_setoran_id,
            };
            return acc;
          }, {});
          this.formData = {
            ...this.formData,
            ...jadwal,
            tgl_berlaku,
          };
        } else {
          this.formData.tgl_berlaku = null;
          this.formRef?.resetFields();
        }
      }
    );
    watch(
      () => this.$props.detail.id,
      () => {
        const { plant_code, company_id, plant_name, bisnis_unit, id } =
          this.$props.detail;
        if (id) {
          this.listRekBank(company_id);
        }
        this.formData = {
          ...this.formData,
          title: `${plant_code} - ${plant_name}`,
          bisnisUnit: bisnis_unit,
        };
      }
    );
  },
  methods: {
    handleClose() {
      this.formRef?.resetFields();
    },
    async createForm() {
      const { id } = this.$props.detail;
      const form: any = {
        tgl_berlaku: moment(this.formData.tgl_berlaku).format("YYYY-MM-DD"),
        cabang_bisnis_unit_id: id,
        jadwal_setoran: [],
      };
      this.days.forEach((element) => {
        form.jadwal_setoran.push({
          hari: element,
          rekening_bank_id: this.formData[element].rekening_bank_id,
          type_setoran: this.formData[element].type_setoran,
          no_kartu_cdm: this.formData[element].no_kartu_cdm,
          pin: this.formData[element].pin,
        });
      });

      this.loading = true;
      try {
        await ApiService.post("jadwal-setoran", form);
        this.alertSubmitSuccess();
      } catch (error) {
        this.alertSubmitErr(error);
      }
    },
    async updateForm() {
      const form: any = {
        jadwal_setoran_cabang_id: this.jadwal_setoran_cabang_id,
        jadwal_setoran: [],
      };

      this.days.forEach((element) => {
        form.jadwal_setoran.push({
          jadwal_setoran: this.formData[element].jadwal_setoran_id,
          hari: element,
          rekening_bank_id: this.formData[element].rekening_bank_id,
          type_setoran: this.formData[element].type_setoran,
          no_kartu_cdm: this.formData[element].no_kartu_cdm,
          pin: this.formData[element].pin,
        });
      });

      this.loading = true;
      try {
        await ApiService.put("jadwal-setoran", form);
        this.alertSubmitSuccess();
      } catch (error) {
        this.alertSubmitErr(error);
      }
    },
    submit() {
      if (!this.formRef) return;
      this.formRef.validate((valid) => {
        if (valid) {
          if (this.jadwal_setoran_cabang_id) {
            this.updateForm();
          } else {
            this.createForm();
          }
        }
      });
    },
    async fetch() {
      try {
        const { data } = await ApiService.get(
          "penunjang?code_penunjang_id=69905"
        );
        const res = data.data.reduce((acc, val) => {
          acc.push({
            label: val.value1,
            value: val.value1,
          });
          return acc;
        }, []);
        this.option.setoran = res;
      } catch (error) {
        console.log(error);
      }
    },
    async listRekBank(company_id) {
      try {
        const { data } = await ApiService.get(
          `rekening-bank?company_id=[${company_id}]&status=[Active]`
        );
        if (data.data) {
          const res = data.data.reduce((acc, val) => {
            acc.push({
              label: `${val.norek} - ${val.bank}`,
              value: val.rekening_bank_id,
              atas_nama: val.atas_nama,
              bank: val.bank,
            });
            return acc;
          }, []);
          this.option.rekening = res;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSelect(data, day) {
      this.formData[day] = {
        ...this.formData[day],
        atasNama: data.atas_nama,
        bankName: data.bank,
      };
    },
    alertSubmitSuccess() {
      this.loading = false;
      hideModal(this.formModalRef);

      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        this.$emit("search-items", "");
      });
    },
    alertSubmitErr(err) {
      const e = err as Error;
      this.loading = false;
      Swal.fire("Error", e.message, "error");
      console.log(err);
    },
  },
  setup() {
    const formRef = ref<FormInstance>();
    const formModalRef = ref<HTMLDivElement | null>(null);
    return {
      formRef,
      formModalRef,
    };
  },
});
</script>
