<template>
  <div
    class="modal fade"
    id="kt_modal_SettingPembayaranFintechModal"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div
          class="modal-header"
          id="kt_modal_SettingPembayaranFintechModal_header"
        >
          <!--begin::Modal title-->
          <h2 class="fw-bold">{{ title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_SettingPembayaranFintechModal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form
          @submit.prevent="submit()"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <div class="modal-body py-10 px-lg-17">
            <div class="row">
              <div class="col-6 fv-row">
                <label class="required fs-5 fw-semobold mb-2">Company</label>
                <el-form-item class="w-100" prop="company_id">
                  <Multiselect
                    v-model="form.company_id"
                    :searchable="true"
                    :options="option.company_id"
                    placeholder="Select"
                    ref="kodeJenisKartu"
                    disabled
                    @click="CopyEvent(form.company_id, 'company_id')"
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-6 fv-row">
                <label class="required fs-5 mb-2"> Bisnis unit </label>
                <Multiselect
                  v-model="form.bisnis_unit"
                  :searchable="true"
                  :close-on-select="false"
                  :groups="true"
                  mode="tags"
                  :options="option.bisnis_unit_id"
                  :disabled="!!form.bisnis_unit[0]"
                  @click="CopyEvent(form.bisnis_unit, 'bisnis_unit_id')"
                ></Multiselect>
              </div>
              <div class="col-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Jenis fintech
                </label>
                <el-form-item class="w-100" prop="jenis_fintech_id">
                  <Multiselect
                    v-model="form.jenis_fintech_id"
                    :searchable="true"
                    :options="option.jenis_fintech_id"
                    placeholder="Select"
                    @click="
                      CopyEvent(form.jenis_fintech_id, 'jenis_fintech_id')
                    "
                    @keydown.enter.prevent="
                      () => {
                        binRef.focus();
                      }
                    "
                    :disabled="view"
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Bin</label>
                <el-form-item class="w-100" prop="bin_id">
                  <Multiselect
                    v-model="form.bin_id"
                    :searchable="true"
                    :options="option.bin_id"
                    placeholder="Select"
                    ref="binRef"
                    @keydown.enter.prevent="
                      () => {
                        discRateRef.focus();
                      }
                    "
                    :disabled="view"
                    @click="CopyEvent(form.bin_id, 'bin_id')"
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Disc rate
                </label>
                <el-form-item prop="disc_rate">
                  <el-input
                    type="text"
                    v-model="form.disc_rate"
                    ref="discRateRef"
                    @click="CopyEvent(form.disc_rate, 'disc_rate')"
                    @keydown.enter.prevent="
                      () => {
                        tgl_berlakuRef.focus();
                      }
                    "
                    @keyup="
                      changeFieldNumber(
                        $event.target.value,
                        'disc_rate',
                        'disc'
                      )
                    "
                    :class="{
                      'is-disabled': view,
                    }"
                    :onkeypress="handleKeyUp()"
                  />
                </el-form-item>
              </div>
              <div class="col-6 fv-row">
                <div class="fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 mb-2">Tanggal Berlaku Disc</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="tgl_berlaku">
                    <el-date-picker
                      v-model="form.tgl_berlaku"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      ref="tgl_berlakuRef"
                      @click="CopyEvent(form.tgl_berlaku, 'tgl_berlaku')"
                      @keydown.enter.prevent="
                        () => {
                          merchant_idRef.focus();
                        }
                      "
                      :class="{
                        'is-disabled': view,
                      }"
                    >
                    </el-date-picker>
                  </el-form-item>

                  <!--end::Input-->
                </div>
              </div>
              <!--begin::Input group-->
              <div class="col-4 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Proses via EDC</label
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
                    v-model="form.proses_via_edc"
                    :disabled="view"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ form.proses_via_edc ? "YES" : "NO" }}
                  </label>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <div class="col-8 fv-row">
                <label class="required fs-6 mb-2">Merchant</label>
                <el-form-item class="w-100" prop="merchant_id">
                  <Multiselect
                    v-model="form.merchant_id"
                    :searchable="true"
                    :options="option.merchant_id"
                    placeholder="Select"
                    ref="merchant_idRef"
                    @change="handleMerchant($event)"
                    @click="CopyEvent(form.merchant_id, 'merchant_id')"
                    :disabled="view"
                  ></Multiselect>
                </el-form-item>
              </div>
              <!--begin::Input group-->
              <div class="col-4 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >EDC sharing</label
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
                    v-model="form.share_edc"
                    :disabled="view"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ form.share_edc ? "YES" : "NO" }}
                  </label>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <div class="col-8 fv-row">
                <label class="required fs-6 mb-2">Mesin share</label>
                <el-form-item prop="mesin_share">
                  <el-input
                    v-model="form.mesin_share"
                    type="text"
                    :class="{
                      'is-disabled': true,
                    }"
                    disabled
                    @click="CopyEvent(form.mesin_share, 'mesin_share')"
                  />
                </el-form-item>
              </div>
              <!--begin::Input group-->
              <div class="col-4 fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Menggunakan ECR</label
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
                    v-model="form.ecr"
                    :class="{
                      'is-disabled': view,
                    }"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ form.ecr ? "YES" : "NO" }}
                  </label>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
          </div>
          <div class="modal-footer flex-center" v-if="!view">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-danger"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
            <!--end::Copy-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from "@vueform/multiselect";
import moment from "moment";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";
import Copy from "@/helper/coppied";
import discRate from "@/helper/discRate";

const form = {
  jenis_fintech_id: "",
  bin_id: "",
  proses_via_edc: true,
  merchant_id: "",
  edc_id: "",
  ecr: false,
  share_edc: false,
  mesin_share: "",
  disc_rate: "",
  tgl_berlaku: "",
  status: "Active",
  company_id: "",
  bisnis_unit: [],
};
export default defineComponent({
  name: "setting-pembayaran-fintech-modal",
  components: {
    Multiselect,
  },
  props: ["option", "filter", "title", "detail", "reFetch", "view"],
  data() {
    return {
      keyCopy: "",
      loading: false,
      form,
      rules: {
        jenis_fintech_id: [
          {
            required: true,
            message: "Jenis fintec is required",
            trigger: "change",
          },
        ],
        bin_id: [
          {
            required: true,
            message: "Bin is required",
            trigger: "change",
          },
        ],
        disc_rate: [
          {
            required: true,
            message: "Disc rate is required",
            trigger: "change",
          },
        ],
        tgl_berlaku: [
          {
            required: true,
            message: "Tanggal Berlaku Disc is required",
            trigger: "change",
          },
        ],
        merchant_id: [
          {
            required: true,
            message: "Merchant is required",
            trigger: "change",
          },
        ],
      },
    };
  },

  updated() {
    const { company_id, bisnis_unit_id } = JSON.parse(this.filter);

    if (this.detail?.bin_id) {
      this.form = {
        ...this.form,
        bin_id: this.detail.bin_id,
        jenis_fintech_id: this.detail.jenis_fintech_id,
        proses_via_edc: this.detail.proses_via_edc === "YES",
        merchant_id: this.detail.merchant_id,
        edc_id: this.detail.edc_id,
        ecr: this.detail.ecr === "YES",
        share_edc: this.detail.share_edc === "YES",
        mesin_share: this.detail.mesin_share,
        disc_rate: this.detail.disc_rate,
        tgl_berlaku: this.detail.tgl_berlaku,
        status: this.detail.status,
      };
    } else {
      // this.form = form;
      this.formRef?.resetFields();
    }

    this.form.company_id = company_id;
    this.form.bisnis_unit = bisnis_unit_id;
  },
  methods: {
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
          this.loading = true;
          const frm = {
            jenis_fintech_id: this.form.jenis_fintech_id,
            bin_id: this.form.bin_id,
            proses_via_edc: this.form.proses_via_edc ? "YES" : "NO",
            merchant_id: this.form.merchant_id,
            edc_id: this.form.edc_id,
            ecr: this.form.ecr ? "YES" : "NO",
            share_edc: this.form.share_edc ? "YES" : "NO",
            mesin_share: this.form.mesin_share,
            disc_rate: this.form.disc_rate.replace(",", "."),
            tgl_berlaku: moment(this.form.tgl_berlaku).format("YYYY-MM-DD"),
            status: "Active",
            company_id: this.form.company_id,
            bisnis_unit: this.form.bisnis_unit.map((item) => ({
              bisnis_unit_id: item,
            })),
          };
          if (this.title != "Add Setting Pembayaran Fintech") {
            const frmUpdate = {
              ...frm,
              status: this.detail.status,
              set_jenis_fintech_id: this.detail.set_jenis_fintech_id,
            };
            this.updateForm(frmUpdate);
          } else {
            this.createForm(frm);
          }
        }
      });
    },
    async createForm(frm) {
      try {
        this.loading = false;

        const { data } = await ApiService.post("jenis-fintech/setting", frm);
        if (data.errors) {
          const [arr] = data.errors;
          Swal.fire({
            text: `${arr.value} sudah ada`,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
        hideModal(this.modalRef);
        this.reFetch();
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async updateForm(frm) {
      try {
        this.loading = false;

        const { data } = await ApiService.put("jenis-fintech/setting", frm);
        if (data.errors) {
          const [arr] = data.errors;
          Swal.fire({
            text: `${arr.value} sudah ada`,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
          return;
        }
        hideModal(this.modalRef);
        this.reFetch();

        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      } catch (error) {
        this.loading = false;

        console.log(error);
      }
    },
    handleMerchant(val) {
      if (val) {
        const { allMerchant } = this.option;
        const find = allMerchant.find((item) => item.merchant_id === val);

        if (find.merchant_share_edc) {
          this.form.ecr = find.ecr === "YES";
          this.form.mesin_share = find.merchant_share_edc.nama_mesin;
          this.form.edc_id = find.merchant_share_edc.edc_id;
        }
      }
    },
    CopyEvent(val, key) {
      const option = [
        "company_id",
        "jenis_fintech_id",
        "bin_id",
        "merchant_id",
      ];
      const optionMutiple = ["bisnis_unit_id"];
      if (this.keyCopy === key) {
        let value = val;
        if (option.includes(key)) {
          const find = this.option[key].find((item) => item.value === val);

          value = find.label;
        }
        if (optionMutiple.includes(key)) {
          const res: string[] = val.reduce((acc, val) => {
            const { options } = this.option[key];
            const find = options.find((item) => item.value === val);
            acc.push(find.label);

            return acc;
          }, []);
          value = res.join(", ");
        }

        Copy(value);
      } else {
        this.keyCopy = key;
      }
    },
    handleKeyUp() {
      console.log();
      if (this.view) {
        this.form = {
          ...this.form,
          disc_rate: this.detail.disc_rate,
        };
      }
    },
    changeFieldNumber(val, act = "fee", format = "rp") {
      if (format == "rp") {
        let number = val
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{1})+(?!\d))/g, ".");

        this.form.disc_rate = `${number}`;
      } else {
        if (act == "disc_rate") {
          this.form.disc_rate = discRate(val);
        }
      }
    },
  },
  setup() {
    const modalRef = ref<HTMLDivElement | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);
    const binRef = ref();
    const discRateRef = ref();
    const tgl_berlakuRef = ref();
    const merchant_idRef = ref();

    return {
      modalRef,
      binRef,
      discRateRef,
      tgl_berlakuRef,
      merchant_idRef,
      formRef,
    };
  },
});
</script>
