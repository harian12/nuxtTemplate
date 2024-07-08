<template>
  <div
    class="modal fade"
    id="kt_modal_add_jenis_kartu_view"
    ref="jenis_kartu_view"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_modal_add_jenis_kartu_view_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">View Master Jenis Kartu</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_jenis_kartu_view_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Group payment
                </label>
                <div class="el-form-item">
                  <el-form-item class="w-100" prop="group_payment">
                    <Multiselect
                      v-model="form.group_payment"
                      :options="option.groupPayment"
                      placeholder="Select"
                      disabled
                      @click="Copy($event.srcElement.innerText)"
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="col-12 fv-row">
              <label class="required fs-6 fw-semobold mb-2">
                Kode jenis kartu
              </label>
              <el-form-item prop="jenis_kartu_code">
                <el-input
                  v-model="form.jenis_kartu_code"
                  type="text"
                  @click="Copy($event.srcElement.value)"
                  :class="{ 'is-disabled': true }"
                />
              </el-form-item>
            </div>
            <div class="col-12 fv-row">
              <label class="required fs-6 fw-semobold mb-2">
                Nama jenis kartu
              </label>
              <el-form-item prop="jenis_kartu">
                <el-input
                  v-model="form.jenis_kartu"
                  type="text"
                  :class="{ 'is-disabled': true }"
                  @click="Copy($event.srcElement.value)"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
input {
  cursor: pointer !important;
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
  props: ["groupPayment", "data"],
  data() {
    return {
      rules: {
        jenis_kartu_code: [
          {
            required: true,
            message: "Required",
            trigger: "change",
          },
        ],
        jenis_kartu: [
          {
            required: true,
            message: "Required",
            trigger: "change",
          },
        ],
        group_payment: {
          required: true,
          message: "Required",
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
        groupPayment: [],
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

    this.option.groupPayment = this.$props.groupPayment;
  },

  methods: {
    submitForm() {
      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
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
        await ApiService.post("jenis-kartu", data);
        this.loading = false;

        hideModal(this.jenis_kartu_view);

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

        hideModal(this.jenis_kartu_view);

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
  },
  setup() {
    const jenis_kartu_view = ref<null | HTMLElement>(null);
    const formRef = ref<null | HTMLFormElement>(null);

    return {
      jenis_kartu_view,
      formRef,
      Copy,
    };
  },
});
</script>
