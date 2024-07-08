<template>
  <div
    class="modal fade"
    id="kt_modal_BIN"
    ref="modalBin"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_BIN_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">{{ title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_BIN_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="resetForm"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form
          @submit.prevent="submitForm()"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <div class="modal-body">
            <div class="row">
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Nomor BIN
                </label>
                <el-form-item prop="bin">
                  <el-input
                    v-model="form.bin"
                    type="number"
                    :class="{
                      'is-disabled': !!detail,
                    }"
                    ref="nomorBIN"
                    :disabled="!!detail"
                    @click="CopyEvent(form.bin, 'bin')"
                  />
                  <span class="errMessageCustom">{{ errMessage["bin"] }}</span>
                </el-form-item>
              </div>
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Nama card center
                </label>
                <el-form-item class="w-100" prop="card_center_id">
                  <Multiselect
                    v-model="form.card_center_id"
                    :searchable="true"
                    :options="option.cardCenter"
                    placeholder="Select"
                    :disabled="!!view"
                    @click="CopyEvent(form.card_center_id, 'card_center_id')"
                    @keydown.enter.prevent="
                      () => {
                        kodeJenisKartu.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Kode jenis kartu
                </label>
                <el-form-item class="w-100" prop="jenis_kartu_id">
                  <Multiselect
                    v-model="form.jenis_kartu_id"
                    :searchable="true"
                    :options="option.jenisKartu"
                    :disabled="!!view"
                    placeholder="Select"
                    ref="kodeJenisKartu"
                    @click="CopyEvent(form.jenis_kartu_id, 'jenis_kartu_id')"
                    @keydown.enter.prevent="
                      () => {
                        nomorBIN.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
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
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Copy from "@/helper/coppied";

export default defineComponent({
  name: "form-jenis-kartu",
  components: {
    Multiselect,
  },
  props: [
    "optJenisKartu",
    "optCardCenter",
    "detail",
    "title",
    "view",
    "reload",
  ],
  data() {
    return {
      dbClick: {
        key: "",
        click: 0,
      },
      titleForm: "",
      rules: {
        jenis_kartu_id: [
          {
            required: true,
            message: "Kode Jenis Kartu Required",
            trigger: "change",
          },
        ],
        card_center_id: [
          {
            required: true,
            message: "Nama Card Center Required",
            trigger: "change",
          },
        ],
        bin: [
          {
            required: true,
            message: "Nomor BIN Required",
            trigger: "change",
          },
          {
            min: 6,
            max: 6,
            message: "Length must be 6",
            trigger: "change",
          },
          {
            trigger: "blur",
            validator(rule, value, callback) {
              if (/^[0123456789]\d{5}$/.test(value)) {
                callback();
              } else {
                callback(new Error("BIN number must be 6 digits"));
              }
            },
          },
        ],
      },
      loading: false,
      form: {
        jenis_kartu_id: "",
        card_center_id: "",
        bin: "",
      },
      option: {
        cardCenter: [] as { label: string; value: string }[],
        jenisKartu: [] as { label: string; value: string }[],
      },
    };
  },
  updated() {
    this.dbClick = {
      click: 0,
      key: "",
    };
    const { optCardCenter, optJenisKartu, detail } = this.$props;
    this.option.cardCenter = optCardCenter;
    this.option.jenisKartu = optJenisKartu;

    if (detail) {
      this.form = {
        jenis_kartu_id: detail.jenis_kartu_id,
        card_center_id: detail.card_center_id,
        bin: detail.bin,
      };
    } else {
      this.form = {
        jenis_kartu_id: "",
        card_center_id: "",
        bin: "",
      };
    }
  },
  methods: {
    resetForm() {
      this.formRef?.resetFields();
    },
    submitForm() {
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
        return;
      }

      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
          if (this.detail) {
            const frm = {
              jenis_kartu_id: this.form.jenis_kartu_id,
              card_center_id: this.form.card_center_id,
              bin_id: this.detail.bin_id,
            };
            this.updateForm(frm);
          } else {
            this.createForm(this.form);
          }
        }
      });
    },
    async createForm(form) {
      try {
        const { data } = await ApiService.post("bin", form);
        if (data.errors) {
          data.errors.forEach((val) => {
            console.log(val);

            this.errMessage[val.path] = val.msg;
          });
          return;
        }
        hideModal(this.modalBin);
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          this.$emit("reload");
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateForm(form) {
      try {
        await ApiService.put("bin", form);
        hideModal(this.modalBin);
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          this.$emit("reload");
        });
      } catch (error) {
        console.log(error);
      }
    },
    CopyEvent(val, key) {
      if (this.dbClick.key === key) {
        this.dbClick.click++;
      } else {
        this.dbClick = {
          click: 1,
          key,
        };
      }

      if (key === this.dbClick.key && this.dbClick.click === 2) {
        if (key === "bin") {
          this.trigerCopy(val);
        } else {
          let opt: any = [];
          if (key === "card_center_id") {
            opt = this.optCardCenter;
          }
          if (key === "jenis_kartu_id") {
            opt = this.optJenisKartu;
          }
          const find = opt.find((item) => item.value === val);
          if (find) this.trigerCopy(find.label);
        }
      }

      setTimeout(() => {
        this.trigerCopy("");
      }, 1000);
    },
    trigerCopy(val) {
      if (val) {
        Copy(val);
        Copy(val);
      }
      this.dbClick = {
        click: 0,
        key: "",
      };
    },
  },
  setup() {
    const modalBin = ref<null | HTMLElement>(null);
    const formRef = ref<null | HTMLFormElement>(null);
    const kodeJenisKartu = ref();
    const nomorBIN = ref();
    const errMessage = ref<any>([]);

    return {
      modalBin,
      formRef,
      kodeJenisKartu,
      nomorBIN,
      errMessage,
    };
  },
});
</script>
