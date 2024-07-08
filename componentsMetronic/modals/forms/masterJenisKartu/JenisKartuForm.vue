<template>
  <div
    class="modal fade"
    id="kt_modal_add_jenis_kartu_form"
    ref="jenis_kartu_form"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_jenis_kartu_form_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">
            {{
              !!formId ? "Update Master Jenis Kartu" : "Add Master Jenis Kartu"
            }}
          </h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_jenis_kartu_form_close"
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
            <div class="col-12 fv-row">
              <label class="required fs-6 fw-semobold mb-2">
                Kode jenis kartu
              </label>
              <el-form-item prop="jenis_kartu_code">
                <el-input
                  ref="jenis_kartu_code"
                  v-model="form.jenis_kartu_code"
                  type="text"
                  @click="CopyEvent(form.jenis_kartu_code, 'jenis_kartu_code')"
                  :class="{ 'is-disabled': !!formId }"
                  @keydown.enter.prevent="
                    () => {
                      jenis_kartu.focus();
                    }
                  "
                />
                <span class="errMessageCustom">{{
                  errMessage["jenis_kartu_code"]
                }}</span>
              </el-form-item>
            </div>
            <div class="col-12 fv-row">
              <label class="required fs-6 fw-semobold mb-2">
                Nama jenis kartu
              </label>
              <el-form-item prop="jenis_kartu">
                <el-input
                  ref="jenis_kartu"
                  v-model="form.jenis_kartu"
                  type="text"
                  @click="CopyEvent(form.jenis_kartu, 'jenis_kartu')"
                />
              </el-form-item>
            </div>
            <div class="row">
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Group payment
                </label>
                <div class="el-form-item">
                  <el-form-item class="w-100" prop="group_payment">
                    <Multiselect
                      v-model="form.group_payment"
                      :searchable="true"
                      :options="option.groupPayment"
                      placeholder="Select"
                      @click="CopyEvent(form.group_payment, 'group_payment')"
                      @keydown.enter.prevent="
                        () => {
                          jenis_kartu_code.focus();
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
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

<style>
input {
  text-transform: uppercase;
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";
import type { AxiosError } from "axios";
import Copy from "@/helper/coppied";

export default defineComponent({
  name: "form-jenis-kartu",
  components: {
    Multiselect,
  },
  props: ["groupPayment", "data", "reload"],
  data() {
    return {
      dbClick: {
        key: "",
        click: 0,
      },
      rules: {
        jenis_kartu_code: [
          {
            required: true,
            message: "Kode jenis kartu is required",
            trigger: "change",
          },
        ],
        jenis_kartu: [
          {
            required: true,
            message: "Nama jenis kartu is required",
            trigger: "change",
          },
        ],
        group_payment: {
          required: true,
          message: "Group payment is required",
          trigger: "change",
        },
      },

      loading: false,
      formId: "",
      form: {
        jenis_kartu_code: "",
        jenis_kartu: "",
        group_payment: "",
      },
      option: {
        groupPayment: [] as { label: string; value: string }[],
      },
    };
  },
  updated() {
    if (this.$props.data) {
      const {
        jenis_kartu_code,
        jenis_kartu,
        group_payment_id,
        jenis_kartu_id,
      } = this.$props.data;
      this.formId = jenis_kartu_id;
      this.form = {
        jenis_kartu_code: jenis_kartu_code,
        jenis_kartu: jenis_kartu,
        group_payment: group_payment_id,
      };
    } else {
      this.formId = "";
      this.form = {
        jenis_kartu_code: "",
        jenis_kartu: "",
        group_payment: "",
      };
    }
    this.resetClick(null);
    this.option.groupPayment = this.$props.groupPayment;
  },

  methods: {
    resetForm() {
      this.form = {
        jenis_kartu_code: "",
        jenis_kartu: "",
        group_payment: "",
      };
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
        if (valid && !!this.form.jenis_kartu && !!this.form.group_payment) {
          this.loading = true;
          if (this.formId) {
            const formUpdate = {
              jenis_kartu: this.form.jenis_kartu.toUpperCase(),
              group_payment_id: this.form.group_payment,
              jenis_kartu_id: this.formId,
            };

            this.updateForm(formUpdate);
          } else {
            this.form.jenis_kartu = this.form.jenis_kartu.toUpperCase();
            this.form.jenis_kartu_code =
              this.form.jenis_kartu_code.toUpperCase();

            const formCreate = {
              jenis_kartu: this.form.jenis_kartu.toUpperCase(),
              group_payment_id: this.form.group_payment,
              jenis_kartu_code: this.form.jenis_kartu_code,
            };
            this.createForm(formCreate);
          }
        }
      });
    },
    async createForm(data) {
      try {
        await ApiService.post("jenis-kartu", data).then((data) => {
          if (data.data.status_code == 200) {
            this.loading = false;

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
              hideModal(this.jenis_kartu_form);
              this.$emit("reload");
            });
          } else if (data.data.status_code == 400) {
            data.data.errors.forEach((val) => {
              this.errMessage[val.path] = val.msg;
            });
            this.loading = false;
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
            this.loading = false;
          }
        });
      } catch (error) {
        this.loading = false;
        const e = error as AxiosError;
        let msg = e.message;
        if (e.response?.data) {
          const { data } = e.response.data as any;
          msg = data.msg;
        }
        Swal.fire({
          text: msg,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
        console.log(e.response?.data);
      }
    },
    async updateForm(data) {
      try {
        await ApiService.put("jenis-kartu", data);
        this.loading = false;

        hideModal(this.jenis_kartu_form);

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
        this.loading = false;
        const e = error as AxiosError;
        let msg = e.message;
        if (e.response?.data) {
          const { data } = e.response.data as any;
          msg = data.msg;
        }
        Swal.fire({
          text: msg,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    },
    CopyEvent(val, key) {
      if (key === this.dbClick.key) {
        this.dbClick.click++;
      } else {
        this.dbClick.key = key;
        this.dbClick.click = 1;
      }
      if (key === this.dbClick.key && this.dbClick.click === 2) {
        if (key === "group_payment") {
          const find: any = this.option.groupPayment.find(
            (item) => item.value === val
          );
          this.resetClick(find.label);
        } else {
          this.resetClick(val);
        }
      }
      setTimeout(() => {
        this.resetClick(null);
      }, 1000);
    },
    resetClick(val) {
      if (val) {
        Copy(val);
        Copy(val);
      }
      this.dbClick = {
        key: "",
        click: 0,
      };
    },
  },
  setup() {
    const jenis_kartu_form = ref<null | HTMLElement>(null);
    const formRef = ref<null | HTMLFormElement>(null);
    const jenis_kartu = ref();
    const jenis_kartu_code = ref();
    const errMessage = ref<any>([]);

    return {
      jenis_kartu_form,
      formRef,
      jenis_kartu,
      jenis_kartu_code,
      errMessage,
    };
  },
});
</script>
