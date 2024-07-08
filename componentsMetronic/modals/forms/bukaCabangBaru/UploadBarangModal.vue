<template>
  <div
    class="modal fade"
    id="kt_UploadBarangModal"
    ref="UploadBarangModal"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <el-form>
          <div class="modal-body py-10 px-lg-17">
            <div
              class="swal2-icon swal2-warning swal2-icon-show"
              style="display: flex;"
            >
              <div class="swal2-icon-content">!</div>
            </div>
            <p style="text-align: center; font-size: 14px;" class="mt-10 mb-10">
              Ambil data asset?
            </p>
            <Multiselect
              v-model="filter.bunit"
              :searchable="true"
              :options="filter.optionsBunit"
              placeholder="Pilih bisnis unit"
              class="mt-4"
              disabled
            ></Multiselect>
            <VueDatePicker
              v-model="filter.tglAsset"
              :enable-time-picker="false"
              range
              multi-calendars
              format="dd/MM/yyyy"
              class="mt-4"
            ></VueDatePicker>
          </div>
          <div class="d-flex justify-content-center mb-10">
            <button
              :data-kt-indicator="loadingSubmit ? 'on' : null"
              class="btn btn-lg btn-danger btn-sm"
              type="submit"
              @click="refreshData"
            >
              <span v-if="!loadingSubmit" class="indicator-label"> Ok </span>
              <span v-if="loadingSubmit" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <button
              class="btn btn-light btn-sm btn-sm"
              type="submit"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span class="indicator-label"> Cancel </span>
            </button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Copy from "../../../../helper/coppied";
import { addBukaCabangInput, bukaCabangList } from "@/stores/bukaCabangBaru";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "UploadBarangModal",
  data() {
    return {
      loading: false,
      form: {},
      rules: {},
      loadingSubmit: false,
    };
  },
  components: {
    Multiselect,
    VueDatePicker,
  },
  methods: {
    submitForm() {},
    async refreshData() {
      if (
        this.filter.bunit == "" ||
        this.filter.bunit == undefined ||
        this.filter.tglAsset == null
      ) {
        hideModal(this.UploadBarangModal);
        return false;
      }

      const tglAwal = moment(this.filter.tglAsset[0]).format("YYYY-MM-DD");
      const tglAkhir = moment(this.filter.tglAsset[1]).format("YYYY-MM-DD");
      this.loadingSubmit = true;
      try {
        await ApiService.get(
          `barang-dagang/cabang?cabang_bisnis_unit_id=${this.filter.bunit}&drtgl=${tglAwal}&sdtgl=${tglAkhir}`
        ).then((data) => {
          if (data.data.data.status) {
            Swal.fire({
              text: "Berhasil ambil data",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            this.filter.tglAsset = [];
            this.$emit("reload");
            hideModal(this.UploadBarangModal);
            this.loadingSubmit = false;
          } else {
            Swal.fire("Gagal", "Gagal ambil data", "error");
            return false;
          }
        });
      } catch (error) {
        hideModal(this.UploadBarangModal);
        Swal.fire("Gagal", "Gagal ambil data", "error");
        return false;
      }
    },
  },
  setup() {
    const UploadBarangModal = ref<HTMLDListElement | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);
    const filter = ref({
      bunit: "",
      tglAsset: [],
      optionsBunit: <any>[],
    });

    watch(
      () => [addBukaCabangInput.data, bukaCabangList.data],
      (data) => {
        bukaCabangList.data.forEach((val: any) => {
          filter.value.optionsBunit.push({
            value: val.cabang_bisnis_unit_id,
            label: val.bisnis_unit,
          });
        });

        filter.value.bunit = String(data[0].cabang_bisnis_unit_id);
      }
    );

    return { UploadBarangModal, formRef, Copy, filter };
  },
});
</script>
