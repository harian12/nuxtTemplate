<template>
  <div
    class="modal fade"
    id="kt_modal_add_kelamin"
    ref="addKelaminModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_kelamin_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Jenis Kelamin</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_kelamin_close"
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
              id="kt_modal_add_agama_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_agama_header"
              data-kt-scroll-wrappers="#kt_modal_add_agama_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2"
                    >Nama Master</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.master_name"
                      type="text"
                      class="is-disabled"
                      readonly
                      required
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Copy-->
              <hr />

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-5 fw-semobold mb-2"
                    >Type Value 1</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select
                    v-model="formData.type1"
                    class="form-select form-select-solid form-select-sm"
                    @click="Copy(formData.type1)"
                    required
                  >
                    <option value="input manual" selected>Input Manual</option>
                    <option value="dari tabel">Dari Tabel</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type1 == 'input manual'"
                >
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2">Value 1</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="value1">
                    <el-input
                      v-model="formData.value1"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type1 == 'dari tabel'"
                >
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2">Value 1</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Multiselect
                    required
                    v-model="formData.value1"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value1"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semobold mb-2">Type Value 2</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select
                    v-model="formData.type2"
                    class="form-select form-select-solid form-select-sm"
                    @click="Copy(formData.type2)"
                  >
                    <option value="input manual" selected>Input Manual</option>
                    <option value="dari tabel">Dari Tabel</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type2 == 'input manual'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 2</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.value2"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type2 == 'dari tabel'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 2</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Multiselect
                    v-model="formData.value2"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value2"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semobold mb-2">Type Value 3</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select
                    v-model="formData.type3"
                    class="form-select form-select-solid form-select-sm"
                    @click="Copy(formData.type3)"
                  >
                    <option value="input manual" selected>Input Manual</option>
                    <option value="dari tabel">Dari Tabel</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type3 == 'input manual'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 3</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.value3"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type3 == 'dari tabel'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 3</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Multiselect
                    v-model="formData.value3"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value3"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semobold mb-2">Type Value 4</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select
                    v-model="formData.type4"
                    class="form-select form-select-solid form-select-sm"
                    @click="Copy(formData.type4)"
                  >
                    <option value="input manual" selected>Input Manual</option>
                    <option value="dari tabel">Dari Tabel</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type4 == 'input manual'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 4</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.value4"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type4 == 'dari tabel'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 4</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Multiselect
                    v-model="formData.value4"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value4"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-5 fw-semobold mb-2">Type Value 5</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <select
                    v-model="formData.type5"
                    class="form-select form-select-solid form-select-sm"
                    @click="Copy(formData.type5)"
                  >
                    <option value="input manual" selected>Input Manual</option>
                    <option value="dari tabel">Dari Tabel</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type5 == 'input manual'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 5</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.value5"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>

                <div
                  class="col-md-6 fv-row"
                  v-if="formData.type5 == 'dari tabel'"
                >
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Value 5</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <Multiselect
                    v-model="formData.value5"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value5"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
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
            <!--end::Copy-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "add-kelamin-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addKelaminModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      master_name: "Jenis kelamin",
      type1: "input manual",
      value1: "",
      type2: "input manual",
      value2: "",
      type3: "input manual",
      value3: "",
      type4: "input manual",
      value4: "",
      type5: "input manual",
      value5: "",
      optionValue: [
        {
          options: [
            {
              value: "Master Company",
              label: "Master Company",
            },
            {
              value: "Master Bisnis Unit",
              label: "Master Bisnis Unit",
            },
            {
              value: "Master Sales Organization",
              label: "Master Sales Organization",
            },
            {
              value: "Master Pulau",
              label: "Master Pulau",
            },
            {
              value: "Master Propinsi",
              label: "Master Propinsi",
            },
            {
              value: "Master Kota",
              label: "Master Kota",
            },
            {
              value: "Master Region",
              label: "Master Region",
            },
            {
              value: "Master Plant",
              label: "Master Plant",
            },
            {
              value: "Master Cabang",
              label: "Master Cabang",
            },
            {
              value: "Master Sloc",
              label: "Master Sloc",
            },
            {
              value: "Master Jenis Setoran",
              label: "Master Jenis Setoran",
            },
            {
              value: "Master Vendor Payment Gateway",
              label: "Master Vendor Payment Gateway",
            },
            {
              value: "Master Tujuan Permintaan Mesin",
              label: "Master Tujuan Permintaan Mesin",
            },
            {
              value: "Master Type Contact Lens",
              label: "Master Type Contact Lens",
            },
            {
              value: "Master Kategori Frame",
              label: "Master Kategori Frame",
            },
            {
              value: "Master Informasi Alamat Display",
              label: "Master Informasi Alamat Display",
            },
            {
              value: "Master Issue Stock Opname",
              label: "Master Issue Stock Opname",
            },
            {
              value: "Master Type Pengiriman",
              label: "Master Type Pengiriman",
            },
            {
              value: "Master Agama",
              label: "Master Agama",
            },
            {
              value: "Master Title",
              label: "Master Title",
            },
            {
              value: "Master Interest",
              label: "Master Interest",
            },
            {
              value: "Master Jenis Kelamin",
              label: "Master Jenis Kelamin",
            },
            {
              value: "Master Pekerjaan",
              label: "Master Pekerjaan",
            },
            {
              value: "Master Pengambilan Stock Dari",
              label: "Master Pengambilan Stock Dari",
            },
            {
              value: "Master Proses Edging",
              label: "Master Proses Edging",
            },
            {
              value: "Master Material Image",
              label: "Master Material Image",
            },
            {
              value: "Master Colour",
              label: "Master Colour",
            },
            {
              value: "Master Material Frame Case",
              label: "Master Material Frame Case",
            },
            {
              value: "Master Material Hierarchy",
              label: "Master Material Hierarchy",
            },
            {
              value: "Master Material Group",
              label: "Master Material Group",
            },
            {
              value: "Master Character Code",
              label: "Master Character Code",
            },
            {
              value: "Master Characteristic",
              label: "Master Characteristic",
            },
            {
              value: "Master Material Characteristic",
              label: "Master Material Characteristic",
            },
            {
              value: "Master Material Type",
              label: "Master Material Type",
            },
            {
              value: "Master Material Barang",
              label: "Master Material Barang",
            },
            {
              value: "Master Group Harga",
              label: "Master Group Harga",
            },
            {
              value: "Master Harga",
              label: "Master Harga",
            },
            {
              value: "Master Jurnal Code",
              label: "Master Jurnal Code",
            },
            {
              value: "Master Rekening Bank",
              label: "Master Rekening Bank",
            },
            {
              value: "Master Jadwal Setoran",
              label: "Master Jadwal Setoran",
            },
            {
              value: "Master Kategori & Sub Kategori Info Promo",
              label: "Master Kategori & Sub Kategori Info Promo",
            },
            {
              value: "Master Group Cabang Buffer ATK",
              label: "Master Group Cabang Buffer ATK",
            },
            {
              value: "Master Group Cabang Info Promo",
              label: "Master Group Cabang Info Promo",
            },
            {
              value: "Master Group Voucher",
              label: "Master Group Voucher",
            },
            {
              value: "Master Voucher",
              label: "Master Voucher",
            },
            {
              value: "Master Group Payment",
              label: "Master Group Payment",
            },
            {
              value: "Master EDC",
              label: "Master EDC",
            },
            {
              value: "Master Merchant",
              label: "Master Merchant",
            },
            {
              value: "Master Relasi Merchant Jurnal Code",
              label: "Master Relasi Merchant Jurnal Code",
            },
            {
              value: "Master Jenis Kartu",
              label: "Master Jenis Kartu",
            },
            {
              value: "Master Card Center",
              label: "Master Card Center",
            },
            {
              value: "Master BIN",
              label: "Master BIN",
            },
            {
              value: "Master Discount Rate Per Jenis Kartu (Offline Store)",
              label: "Master Discount Rate Per Jenis Kartu (Offline Store)",
            },
            {
              value: "Master Discount Rate Per Jenis Kartu (Online Store)",
              label: "Master Discount Rate Per Jenis Kartu (Online Store)",
            },
            {
              value: "Master Maintenance Polis Dan Kode Langganan",
              label: "Master Maintenance Polis Dan Kode Langganan",
            },
            {
              value: "Master Jenis Fintech",
              label: "Master Jenis Fintech",
            },
            {
              value: "Master Setting Pembayaran Fintech",
              label: "Master Setting Pembayaran Fintech",
            },
            {
              value: "Master Pembayaran Bank Transfer",
              label: "Master Pembayaran Bank Transfer",
            },
            {
              value: "Master Pembayaran Pay Later",
              label: "Master Pembayaran Pay Later",
            },
            {
              value: "Master Pembayaran Qris",
              label: "Master Pembayaran Qris",
            },
            {
              value: "Master Susunan Display Per Cabang",
              label: "Master Susunan Display Per Cabang",
            },
          ],
        },
      ],
    });

    const rules = ref({
      type1: [
        {
          required: true,
          message: "Type 1 is required",
          trigger: "change",
        },
      ],
      value1: [
        {
          required: true,
          message: "Value 1 is required",
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
            type1: formData.value.type1,
            value1: formData.value.value1,
            type2: formData.value.type2,
            value2: formData.value.value2,
            type3: formData.value.type3,
            value3: formData.value.value3,
            type4: formData.value.type4,
            value4: formData.value.value4,
            type5: formData.value.type5,
            value5: formData.value.value5,
            master_name: "Jenis kelamin",
            code_penunjang: 476002,
            code: "JK",
          };

          let save = await ApiService.post("penunjang", saveData);

          if (save.status == 200) {
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
              hideModal(addKelaminModalRef.value);
              emit("reload");
            });
          } else {
            Swal.fire({
              text:
                "Sorry, looks like there are some errors detected, please try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            });
            return false;
          }
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addKelaminModalRef,
      getAssetPath,
      Copy,
    };
  },
});
</script>
