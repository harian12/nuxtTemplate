<template>
  <div
    class="modal fade"
    id="kt_modal_add_maintainpenunjang"
    ref="addKirimModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_maintainpenunjang_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Maintain Penunjang</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_maintainpenunjang_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="formRef?.resetFields()"
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
              id="kt_modal_add_maintainpenunjang_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_maintainpenunjang_header"
              data-kt-scroll-wrappers="#kt_modal_add_maintainpenunjang_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2">Code</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="code">
                    <el-input
                      v-model="formData.code"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          master_name.focus();
                        }
                      "
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="required fs-5 fw-semobold mb-2"
                    >Keterangan Parameter</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="master_name">
                    <el-input
                      v-model="formData.master_name"
                      type="text"
                      ref="master_name"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          keterangan.focus();
                        }
                      "
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <div class="row mb-5">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <!--end::Label-->
                  <label class="fs-5 fw-semobold mb-2">Catatan</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="keterangan">
                    <el-input
                      v-model="formData.keterangan"
                      type="text"
                      ref="keterangan"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          type1.focus();
                        }
                      "
                    />
                  </el-form-item>

                  <!--end::Input-->
                </div>
                <!--end::Col-->
              </div>

              <!--begin::Copy-->
              <hr />
              <br />
              <div class="table-responsive">
                <table
                  class="table align-middle table-row-bordered table-hover"
                >
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Value 1</th>
                    <th>Value 2</th>
                    <th>Action</th>
                  </tr>
                  <tr
                    v-for="(row, key) in formData.sub_penunjang"
                    :key="key"
                    v-show="key"
                  >
                    <td>{{ row.value1 }}</td>
                    <td>{{ row.value2 != "" ? row.value2 : "-" }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-light"
                        @click="delImage(row.value1)"
                      >
                        <i class="fa fa-trash" style="color: red;"></i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
              <br />
              <div class="row">
                <div class="col-4 mb-2">
                  <label class="required fs-6 fw-semobold mb-2">Type 1</label>
                  <Multiselect
                    v-model="formData.type1"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="type1"
                    :options="formData.optionType"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        value1.focus();
                      }
                    "
                  ></Multiselect>
                </div>
                <div class="col-4 mb-3" v-if="formData.type1 == 'input manual'">
                  <label class="required fs-6 fw-semobold mb-2">value 1</label>
                  <el-form-item prop="value1">
                    <el-input
                      v-model="formData.value1"
                      type="text"
                      ref="value1"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          type2.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-3" v-if="formData.type1 == 'dari tabel'">
                  <label class="required fs-6 fw-semobold mb-2">value 1</label>
                  <Multiselect
                    v-model="formData.value1"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value1"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        type2.focus();
                      }
                    "
                  ></Multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-4 mb-3">
                  <label class="fs-6 fw-semobold mb-2">Type 2</label>
                  <Multiselect
                    v-model="formData.type2"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="type2"
                    :options="formData.optionType"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        value2.focus();
                      }
                    "
                  ></Multiselect>
                </div>
                <div class="col-4 mb-3" v-if="formData.type2 == 'input manual'">
                  <label class="fs-6 fw-semobold mb-2">value 2</label>
                  <el-form-item prop="value2">
                    <el-input
                      v-model="formData.value2"
                      type="text"
                      ref="value2"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          type3.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-3" v-if="formData.type2 == 'dari tabel'">
                  <label class="fs-6 fw-semobold mb-2">value 2</label>
                  <Multiselect
                    v-model="formData.value2"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value2"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        type3.focus();
                      }
                    "
                  ></Multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-4 mb-3">
                  <label class="fs-6 fw-semobold mb-2">Type 3</label>
                  <Multiselect
                    v-model="formData.type3"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="type3"
                    :options="formData.optionType"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        value3.focus();
                      }
                    "
                  ></Multiselect>
                </div>
                <div class="col-4 mb-3" v-if="formData.type3 == 'input manual'">
                  <label class="fs-6 fw-semobold mb-2">value 3</label>
                  <el-form-item prop="value3">
                    <el-input
                      v-model="formData.value3"
                      type="text"
                      ref="value3"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          type4.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-3" v-if="formData.type3 == 'dari tabel'">
                  <label class="fs-6 fw-semobold mb-2">value 3</label>
                  <Multiselect
                    v-model="formData.value3"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value3"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        type4.focus();
                      }
                    "
                  ></Multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-4 mb-3">
                  <label class="fs-6 fw-semobold mb-2">Type 4</label>
                  <Multiselect
                    v-model="formData.type4"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="type4"
                    :options="formData.optionType"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        value4.focus();
                      }
                    "
                  ></Multiselect>
                </div>
                <div class="col-4 mb-3" v-if="formData.type4 == 'input manual'">
                  <label class="fs-6 fw-semobold mb-2">value 4</label>
                  <el-form-item prop="value4">
                    <el-input
                      v-model="formData.value4"
                      type="text"
                      ref="value4"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      @keydown.enter.prevent="
                        () => {
                          type5.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-3" v-if="formData.type4 == 'dari tabel'">
                  <label class="fs-6 fw-semobold mb-2">value 4</label>
                  <Multiselect
                    v-model="formData.value4"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="value4"
                    :options="formData.optionValue"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        type5.focus();
                      }
                    "
                  ></Multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-4 mb-3">
                  <label class="fs-6 fw-semobold mb-2">Type 5</label>
                  <Multiselect
                    v-model="formData.type5"
                    :searchable="true"
                    :close-on-select="true"
                    :groups="true"
                    ref="type5"
                    :options="formData.optionType"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                    @keydown.enter.prevent="
                      () => {
                        value5.focus();
                      }
                    "
                  ></Multiselect>
                </div>
                <div class="col-4 mb-3" v-if="formData.type5 == 'input manual'">
                  <label class="fs-6 fw-semobold mb-2">value 5</label>
                  <el-form-item prop="value5">
                    <el-input
                      v-model="formData.value5"
                      type="text"
                      ref="value5"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-3" v-if="formData.type5 == 'dari tabel'">
                  <label class="fs-6 fw-semobold mb-2">value 5</label>
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
                </div>
                <div class="col-4 mt-8">
                  <button
                    type="button"
                    class="btn btn-outline btn-outline btn-outline-danger btn-active-light-danger btn-sm"
                    @click="saveTable()"
                  >
                    + tambah value
                  </button>
                </div>
              </div>
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
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";
import Multiselect from "@vueform/multiselect";
import axios from "axios";

export default defineComponent({
  name: "add-maintainpenunjang-modal",
  components: { Multiselect },
  props: ["formValue"],
  emits: ["reload"],
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addKirimModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const master_name = ref();
    const code = ref();
    const type1 = ref();
    const type2 = ref();
    const type3 = ref();
    const type4 = ref();
    const type5 = ref();
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const value4 = ref();
    const value5 = ref();
    const keterangan = ref();
    const formData = ref({
      sub_penunjang: <any>[
        {
          subpenunjangId: "",
          code_penunjang: "",
          type1: "",
          type2: "",
          type3: "",
          type4: "",
          type5: "",
          value1: "",
          value2: "",
          value3: "",
          value4: "",
          value5: "",
          code: "",
          master_name: "",
          desc: "",
        },
      ],
      code: "",
      master_name: "",
      type1: "input manual",
      value1: "",
      type2: "",
      value2: "",
      type3: "",
      value3: "",
      type4: "",
      value4: "",
      type5: "",
      value5: "",
      desc: "",
      keterangan: "",
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
      optionType: [
        {
          options: [
            {
              value: "input manual",
              label: "Input Manual",
            },
            {
              value: "dari tabel",
              label: "Dari Tabel",
            },
          ],
        },
      ],
    });

    const rules = ref({
      code: [
        {
          required: true,
          message: "Kode Counter is required",
          trigger: "change",
        },
      ],
      master_name: [
        {
          required: true,
          message: "Keterangan Parameter is required",
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

    const saveTable = () => {
      if (formData.value.value1 == "") {
        Swal.fire({
          text:
            "Sorry, looks like there are some errors detected, please try again.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
        return false;
      }

      formData.value.sub_penunjang.push({
        type1: formData.value.type1,
        type2: formData.value.type2,
        type3: formData.value.type3,
        type4: formData.value.type4,
        type5: formData.value.type5,
        value1: formData.value.value1
          ? formData.value.value1.toUpperCase()
          : formData.value.value1,
        value2: formData.value.value2
          ? formData.value.value2.toUpperCase()
          : formData.value.value2,
        value3: formData.value.value3
          ? formData.value.value3.toUpperCase()
          : formData.value.value3,
        value4: formData.value.value4
          ? formData.value.value4.toUpperCase()
          : formData.value.value4,
        value5: formData.value.value5
          ? formData.value.value5.toUpperCase()
          : formData.value.value5,
        subpenunjangId: "",
      });
      formData.value.value1 = "";
      formData.value.value2 = "";
      formData.value.value3 = "";
      formData.value.value4 = "";
      formData.value.value5 = "";
    };

    const delImage = async (key) => {
      let index = formData.value.sub_penunjang
        .map((x) => {
          return x.value1;
        })
        .indexOf(key);

      formData.value.sub_penunjang.splice(index, 1);
    };

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
          console.log(formData.value.sub_penunjang);

          let penunjangData: any = [];
          formData.value.sub_penunjang.forEach((val: any, key: number) => {
            if (key > 0) {
              penunjangData.push({
                type1: val.type1,
                type2: val.type2,
                type3: val.type3,
                type4: val.type4,
                type5: val.type5,
                value1: val.value1 ? val.value1.toUpperCase() : val.value1,
                value2: val.value2 ? val.value2.toUpperCase() : val.value2,
                value3: val.value3 ? val.value3.toUpperCase() : val.value3,
                value4: val.value4 ? val.value4.toUpperCase() : val.value4,
                value5: val.value5 ? val.value5.toUpperCase() : val.value5,
                master_name: formData.value.master_name.toUpperCase(),
                code: formData.value.code.toUpperCase(),
                desc: "-",
              });
            }
          });

          const saveData = {
            penunjang: penunjangData,
            master_name: formData.value.master_name.toUpperCase(),
            keterangan: formData.value.keterangan.toUpperCase(),
            code: formData.value.code.toUpperCase(),
          };

          await ApiService.post("penunjang/master", saveData).then((data) => {
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
                hideModal(addKirimModalRef.value);
                emit("reload");
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
              loading.value = false;
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
              loading.value = false;
            }
          });
        }
      });
    };

    /* watch(props, (newVal) => {
      formRef?.value?.resetFields();
      formData.value = {
        ...formData.value,
        ...newVal.formValue,
      };
    }); */

    return {
      Multiselect,
      formData,
      rules,
      submit,
      formRef,
      loading,
      addKirimModalRef,
      getAssetPath,
      Copy,
      master_name,
      code,
      type1,
      type2,
      type3,
      type4,
      type5,
      value1,
      value2,
      value3,
      value4,
      value5,
      keterangan,
      saveTable,
      delImage,
    };
  },
});
</script>
