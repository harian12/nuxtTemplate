<template>
  <div
    class="modal fade"
    id="kt_modal_add_jadwalsetoran"
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
        <div class="modal-header" id="kt_modal_add_jadwalsetoran_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold" v-if="!view">
            {{ isEdit ? "Edit Jadwal Setoran" : "Add Jadwal Setoran Baru" }}
          </h2>
          <h2 class="fw-bold" v-if="!!view">
            {{ view }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_jadwalsetoran_close"
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
          <div class="modal-body py-10">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_jadwalsetoran_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_jadwalsetoran_header"
              data-kt-scroll-wrappers="#kt_modal_add_jadwalsetoran_scroll"
              data-kt-scroll-offset="300px"
            >
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
                      @click="Copy($event.srcElement.value)"
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
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semibold mb-2"
                    >Tanggal Berlaku (DD/MM/YYYY)</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.tgl_berlaku"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 335px"
                      :disabled="!!view"
                      @click="Copy($event.srcElement.value)"
                    >
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
                <div style="min-width: 150px">
                  <!--begin::Label-->
                  <div
                    v-for="(day, idx) in days"
                    :key="idx"
                    :style="{ height: idx === 0 ? '80px' : '50px' }"
                  >
                    <label
                      v-if="idx === 0"
                      class="required fs-6 fw-semobold mb-2"
                      >Type Setoran</label
                    >
                    <!--end::Label-->
                    <!--begin::Input-->
                    <div class="el-form-item">
                      <el-form-item class="w-100" :prop="`${day}.type_setoran`">
                        <Multiselect
                          v-model="formData[day].type_setoran"
                          :searchable="true"
                          :options="formData.optSetoran"
                          placeholder="Setor"
                          :disabled="!!view"
                          @select="
                            (id, _) => {
                              formData[day].type_setoran = id;
                            }
                          "
                          @click="Copy(formData[day].type_setoran)"
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
                    <label
                      v-if="idx === 0"
                      class="required fs-6 fw-semobold mb-2"
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
                          :options="formData.optRek"
                          placeholder="Rekening"
                          @change="(val) => handleRek(val, day)"
                          :disabled="!!view"
                          @select="
                            (id, _) => {
                              formData[day].rekening_bank_id = id;
                            }
                          "
                          @click="Copy(formData[day].rekening_bank_id)"
                        ></Multiselect>
                      </el-form-item>
                    </div>
                  </div>
                  <!--end::Input-->
                </div>
                <div :style="{ minWidth: '180px' }">
                  <div
                    class="d-flex align-items-end"
                    v-for="(day, idx) in days"
                    :key="idx"
                    :style="{
                      minWidth: '120px',
                      maxWidth: '120px',
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
                <div :style="{ minWidth: '200px' }">
                  <div
                    :style="{
                      height: idx === 0 ? '80px' : '50px',
                    }"
                    v-for="(day, idx) in days"
                    :key="idx"
                  >
                    <!--begin::Label-->
                    <label
                      v-if="idx === 0"
                      class="required fs-6 fw-semobold mb-2"
                      >Nomor Kartu CDM</label
                    >
                    <!--end::Label-->
                    <!--begin::Input-->
                    <el-form-item :prop="`${day}.no_kartu_cdm`">
                      <el-input
                        v-model="formData[day].no_kartu_cdm"
                        type="number"
                        placeholder=""
                        :class="{ 'is-disabled': !!view }"
                        :readonly="!!view"
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <div :style="{ minWidth: '80px' }">
                  <div
                    :style="{
                      height: idx === 0 ? '80px' : '50px',
                    }"
                    v-for="(day, idx) in days"
                    :key="idx"
                  >
                    <!--begin::Label-->
                    <label
                      v-if="idx === 0"
                      class="required fs-6 fw-semobold mb-2"
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
                        :class="{ 'is-disabled': !!view }"
                        :readonly="!!view"
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-end" v-if="!view">
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import moment from "moment/moment";
import "moment/locale/id.js";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-jadwalsetorane-modal",
  components: { Multiselect },
  data() {
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

    return {
      days: moment.weekdays(),
      loading: false,
      isEdit: false,
      listRek: [],
      formData: {
        title: "",
        bisnisUnit: "",
        tgl_berlaku: new Date(),
        ...frm,
        optionsCompany: [],
        optSetoran: [],
        optRek: [],
      },
    };
  },
  props: ["jadwal", "plantName", "bisnisUnit", "tglBerlaku", "view"],
  created() {
    this.fetch();
  },
  updated() {
    this.isUpdate(this.$props.jadwal);

    this.formData.title = this.$props.plantName as string;
    this.formData.bisnisUnit = this.$props.bisnisUnit as string;
  },
  methods: {
    isUpdate(jadwal) {
      if (!jadwal) {
        this.isEdit = false;
        return;
      }

      this.isEdit = true;
      const frm = jadwal.jadwal_setoran.reduce((acc, val) => {
        acc[val.hari] = {
          hari: val.hari,
          rekening_bank_id: val.bank.rekening_bank_id,
          type_setoran: val.type_setoran,
          no_kartu_cdm: val.no_kartu_cdm,
          pin: val.pin,
          atasNama: val.bank.atas_nama,
          bankName: val.bank.bank,
        };

        return acc;
      }, {});

      this.formData = {
        ...this.formData,
        tgl_berlaku: jadwal.tgl_berlaku,
        ...frm,
      };
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
        this.formData.optSetoran = res;
      } catch (error) {
        console.log(error);
      }
      try {
        const { company_id } = this.$route.query;

        const { data } = await ApiService.get(
          `rekening-bank?company_id=[${company_id}]`
        );
        this.listRek = data.data;
        if (data.data) {
          const res = data.data.reduce((acc, val) => {
            acc.push({
              label: `${val.norek} - ${val.bank}`,
              value: val.rekening_bank_id,
            });
            return acc;
          }, []);
          this.formData.optRek = res;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleRek(e, day) {
      const find: any = this.listRek.find(
        (item: any) => item.rekening_bank_id === e
      );
      if (!find) return;
      this.formData[day].atasNama = find.atas_nama;
      this.formData[day].bankName = find.bank;
    },

    submit() {
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
        this.loading = false;
        return;
      }

      if (!this.formRef) {
        return;
      }

      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
          if (this.jadwal) {
            this.updateForm(this.jadwal);
          } else {
            this.createForm();
          }
        }
      });
    },
    async updateForm(jadwal) {
      const form: any = {
        jadwal_setoran_cabang_id: jadwal.jadwal_setoran_cabang_id,
        jadwal_setoran: [],
      };

      this.days.forEach((element) => {
        form.jadwal_setoran.push({
          jadwal_setoran_id: jadwal.jadwal_setoran.find(
            (item) => item.hari === element
          ).jadwal_setoran_id,
          hari: element,
          bank: this.formData[element].rekening_bank_id,
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
    async createForm() {
      const { id } = this.$route.params;
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
    alertSubmitSuccess() {
      this.loading = false;
      hideModal(this.addFormModalRef);

      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        window.location.reload();
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
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);

    const rules = ref({
      tgl_berlaku: [
        {
          required: true,
          message: "Required",
        },
      ],
    });

    const days = moment.weekdays().reduce((acc, val) => {
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
    }, {});

    rules.value = {
      ...rules.value,
      ...days,
    };

    return {
      formRef,
      rules,
      addFormModalRef,
      Copy,
    };
  },
});
</script>
