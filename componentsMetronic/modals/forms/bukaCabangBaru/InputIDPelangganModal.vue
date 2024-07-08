<template>
  <div
    class="modal fade"
    id="kt_InputIDPelangganModal"
    ref="InputIDPelangganModal"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header" id="kt_InputIDPelangganModal_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Input ID Pelanggan</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_InputIDPelangganModal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
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
          <div class="modal-body py-10 px-lg-17">
            <div class="row">
              <div class="col-12 mb-2 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Kode plant</label>
                <el-form-item>
                  <el-input
                    v-model="form.plant_code"
                    type="text"
                    class="is-disabled"
                    readonly
                    @click="copyEvent(form.plant_code)"
                  />
                </el-form-item>
              </div>
              <div class="col-12 mb-2 fv-row">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="fw-bold fs-6 text-gray-800">
                        <th>Jenis</th>
                        <th>ID Pelanggan</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, i) in list" :key="i">
                        <td>{{ data.jenis }}</td>
                        <td>{{ data.id.toUpperCase() }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-sm"
                            @click="removeList(i)"
                          >
                            <i class="fa fa-trash" style="color: red"></i>
                          </button>
                        </td>
                      </tr>
                      <tr v-if="!list[0]">
                        <th colspan="3">No data found</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"> Jenis </label>
                <el-form-item class="w-100">
                  <Multiselect
                    v-model="table.jenis"
                    :searchable="true"
                    :options="option.listPelanggan"
                    placeholder="Select"
                    @click="copyEvent(table.jenis)"
                    @keydown.enter.prevent="
                      () => {
                        inputId.focus();
                      }
                    "
                  ></Multiselect>
                  <span class="errMessageCustom">{{
                    errMessage["jenis"]
                  }}</span>
                </el-form-item>
              </div>
              <div class="col-5 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Input ID </label>
                <el-form-item>
                  <el-input
                    v-model="table.id"
                    type="text"
                    ref="inputId"
                    @click="copyEvent(table.id)"
                  />
                  <span class="errMessageCustom">{{ errMessage["id"] }}</span>
                </el-form-item>
              </div>
              <div class="col-1 fw-row">
                <div class="fv-row mt-8">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="addTable"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-danger"
              type="submit"
              :disabled="!list[0]"
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

<style>
input[type="text"] {
  text-transform: uppercase;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import { inputIDPelanggan } from "@/stores/bukaCabangBaru";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";
import Copy from "@/helper/coppied";

export default defineComponent({
  name: "UploadAsetModal",
  components: {
    Multiselect,
  },
  emits: ["reload"],
  data() {
    return {
      loading: false,
      form: {
        plant_code: "",
        cabang_bisnis_unit_id: "",
      },
      option: {
        listPelanggan: [
          {
            label: "ID Listrik",
            value: "ID Listrik",
          },
          {
            label: "ID PDAM",
            value: "ID PDAM",
          },
          {
            label: "ID Telepon",
            value: "ID Telepon",
          },
        ],
      },
      list: [] as any,
      table: {
        jenis: null,
        id: null,
      },
    };
  },
  created() {
    watch(
      () => inputIDPelanggan.data,
      (data) => {
        this.form = {
          plant_code: data.plant_code,
          cabang_bisnis_unit_id: data.cabang_bisnis_unit_id,
        };

        if (data.cabang_no_pelanggan) {
          this.list = data.cabang_no_pelanggan.map((val) => ({
            jenis: val.jenis_pelanggan,
            id: val.jenis_pelanggan_code,
          }));
        }
      }
    );
  },
  methods: {
    async submitForm() {
      try {
        this.errMessage = [];
        const form = {
          cabang_bisnis_unit_id: this.form.cabang_bisnis_unit_id,
          pelanggan: this.list.map((item) => ({
            jenis_pelanggan: item.jenis,
            jenis_pelanggan_code: item.id.toUpperCase(),
          })),
        };

        const { data } = await ApiService.put(
          "cabang/bisnis-unit/elec-type",
          form
        );
        this.loading = false;

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
        hideModal(this.InputIDPelangganModal);
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
    addTable() {
      this.errMessage["jenis"] = "";
      this.errMessage["id"] = "";
      if (this.table.jenis == null) {
        this.errMessage["jenis"] = "Jenis is required";
      }

      if (this.table.id == null) {
        this.errMessage["id"] = "Input ID is required";
      }

      if (this.table.jenis == null || this.table.id == null) {
        return;
      }

      this.list.push(this.table);
      this.table = {
        jenis: null,
        id: null,
      };
    },
    removeList(i) {
      this.list.splice(i, 1);
    },
    copyEvent(val) {
      Copy(val);
    },
  },
  setup() {
    const InputIDPelangganModal = ref<HTMLDListElement | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);
    const inputId = ref();
    const errMessage = ref<any>([]);

    return { InputIDPelangganModal, formRef, inputId, errMessage };
  },
});
</script>
