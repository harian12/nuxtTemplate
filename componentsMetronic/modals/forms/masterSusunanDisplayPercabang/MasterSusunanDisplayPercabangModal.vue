<template>
  <div
    class="modal fade"
    id="kt_modal_MasterSusunanDisplayPercabangModal"
    ref="modalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div
          class="modal-header"
          id="kt_modal_MasterSusunanDisplayPercabangModal_header"
        >
          <!--begin::Modal title-->
          <h2 class="fw-bold">Setting Susunan Display</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_MasterSusunanDisplayPercabangModal_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="
              () => {
                resetForm();
              }
            "
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <el-form @submit.prevent="submitForm()" :model="form" ref="formRef">
          <div class="modal-body">
            <div class="row">
              <div class="col-4 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Kode plant
                </label>
                <el-form-item>
                  <el-input
                    v-model="cabang.plant_code"
                    type="text"
                    class="is-disabled"
                    readonly
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-4 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Nama plant
                </label>
                <el-form-item>
                  <el-input
                    v-model="cabang.plant_name"
                    type="text"
                    class="is-disabled"
                    readonly
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-4 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Pilih Bisnis Unit
                </label>
                <el-form-item>
                  <el-input
                    v-model="cabang.bisnis_unit"
                    type="text"
                    class="is-disabled"
                    readonly
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col-12 fv-row">
                <table class="table table-bordered">
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Image URL</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(row, key) in image.display_denah" :key="key">
                    <td>{{ row.name }}</td>
                    <td>
                      <!-- <button
                        type="button"
                        class="btn btn-light"
                        style="background-color: transparent"
                        @click="viewOpen(row)"
                      >
                        <i class="fa fa-eye"></i>
                      </button> -->
                      <button
                        type="button"
                        class="btn btn-light"
                        style="background-color: transparent"
                        @click="delImage(key, 'display_denah')"
                      >
                        <i class="fa fa-close" style="color: red"></i>
                      </button>
                    </td>
                  </tr>
                </table>

                <div class="row">
                  <div class="col-8" style="padding-left: 13px !important">
                    <label class="required fs-6 fw-semobold mb-2"
                      >Upload Denah Display</label
                    >
                    <el-form-item prop="file1">
                      <div class="input-group custom-file-button">
                        <input
                          type="file"
                          class="form-control form-select-sm"
                          accept="image/*"
                          id="denah"
                          ref="denah"
                          @change="handleFileDenah($event)"
                          @keydown.enter.prevent="
                            () => {
                              diplayFirst.focus();
                            }
                          "
                          v-if="inputFile"
                        />
                      </div>
                    </el-form-item>
                  </div>
                  <div class="col-2 mt-8">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="addImage('display_denah')"
                    >
                      Upload
                    </button>
                  </div>
<!--                  <div class="col-md-9 fv-row" v-if="!!form.display_cabang_id">
                    <label class="required fs-6 fw-semobold mb-2">File</label>
                    <el-form-item>
                      <el-input
                        v-model="display_denah"
                        type="text"
                        placeholder=""
                        disabled
                      />
                    </el-form-item>
                  </div>
                  <div class="col-md-2 py-10" v-if="!!form.display_cabang_id">
                    <a
                      @click="displayImage(display_denah)"
                      :style="{
                        backgroundColor:
                          display_denah == detailImage.name ? '#fbe1d4' : '',
                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </a>
                  </div>-->
                </div>
              </div>
              <div class="card bg-light shadow-sm" v-if="detailImage.showImage">
                <div class="card-header">
                  <h3 class="card-title">{{ detailImage.name }}</h3>
                </div>
                <div class="card-body card-scroll h-350px">
                  <img
                    :src="'http://' + detailImage.url"
                    class="w-500px me-3"
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div class="hr-border">
              <hr />
              <span class="hr-title">Susunan Display</span>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Display</th>
                    <th>Alamat Display</th>
                    <th>File</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in tableDisplay"
                    :key="i"
                    v-show="!item.f_delete"
                  >
                    <td>{{ item.display }}</td>
                    <td>{{ item.alamat_display }}</td>
                    <td>
                      {{
                        item.id
                          ? item.sub_denah_display
                          : urlLocal(item.sub_denah_display)
                      }}
                      &nbsp;
                      <a
                        @click="displayImage1(item.sub_denah_display)"
                        :style="{
                          backgroundColor:
                            item.sub_denah_display == detailImage1.name1
                              ? '#fbe1d4'
                              : '',
                        }"
                      >
                        <i class="fa fa-eye"></i>
                      </a>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="removeDisplay(i)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          @click="updateDisplay(item)"
                          v-if="!!item.id"
                        >
                          <KTIcon icon-name="pencil" icon-class="fs-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!tableDisplay.filter((item) => !item.f_delete)[0]">
                    <th colspan="3" class="text-center">No data found</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card bg-light shadow-sm" v-if="detailImage1.showImage1">
              <div class="card-header">
                <h3 class="card-title">{{ detailImage1.name1 }}</h3>
              </div>
              <div class="card-body card-scroll h-350px">
                <img
                  :src="'http://' + detailImage1.url1"
                  class="w-500px me-3"
                  alt="image"
                />
              </div>
            </div>
            <div class="hr-border">
              <hr />
              <span class="hr-title">Tambah Display</span>
            </div>
            <div class="row">
              <div class="col-2 fw-row">
                <label class="required fs-6 fw-semobold mb-2">Display</label>
                <el-form-item>
                  <el-input
                    v-model="display.first"
                    type="text"
                    ref="diplayFirst"
                    :class="{ 'is-disabled': update.display }"
                    @keydown.enter.prevent="
                      () => {
                        diplaySecond.focus();
                      }
                    "
                    :readonly="update.display"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-2 fw-row">
                <label class="fs-6 fw-semobold mb-2">&nbsp;</label>
                <el-form-item>
                  <el-input
                    v-model="display.second"
                    :class="{ 'is-disabled': update.display }"
                    type="text"
                    ref="diplaySecond"
                    @keydown.enter.prevent="
                      () => {
                        alamat.focus();
                      }
                    "
                    :readonly="update.display"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-8 fw-row">
                <label class="fs-6 fw-semobold mb-2">Alamat display</label>
                <el-form-item>
                  <Multiselect
                    v-model="display.alamat_display"
                    :searchable="true"
                    :options="option.alamat_display"
                    placeholder="Select"
                    ref="alamat"
                    @keydown.enter.prevent="
                      () => {
                        sub_display?.focus();
                      }
                    "
                    @select="
                      (id, _) => {
                        display.alamat_display = id;
                      }
                    "
                    @click="
                      () => {
                        option.alamat_display.forEach((element) => {
                          if (display.alamat_display == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered">
                <tr class="fw-bold fs-6 text-gray-800">
                  <th>Image URL</th>
                  <th>Action</th>
                </tr>
                <tr v-for="(row, key) in image.sub_denah_display" :key="key">
                  <td>{{ row.name }}</td>
                  <td>
                    <!-- <button
                      type="button"
                      class="btn btn-light"
                      style="background-color: transparent"
                      @click="viewOpen(row)"
                    >
                      <i class="fa fa-eye"></i>
                    </button> -->
                    <button
                      type="button"
                      class="btn btn-light"
                      style="background-color: transparent"
                      @click="delImage(key, 'sub_denah_display')"
                    >
                      <i class="fa fa-close" style="color: red"></i>
                    </button>
                  </td>
                </tr>
              </table>
            </div>
            <div class="row">
              <div class="col-8" style="padding-left: 13px !important">
                <label class="required fs-6 fw-semobold mb-2"
                  >Upload Denah SubDisplay</label
                >
                <el-form-item prop="file">
                  <div class="input-group custom-file-button">
                    <input
                      type="file"
                      class="form-control form-select-sm"
                      id="sub_display"
                      ref="sub_display"
                      accept="image/*"
                      @change="handleFileSub($event)"
                      @keydown.enter.prevent="
                        () => {
                          subFirst.focus();
                        }
                      "
                      v-if="inputFile"
                    />
                  </div>
                </el-form-item>
              </div>
              <div class="col-2 mt-8">
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="addImage('sub_denah_display')"
                >
                  Upload
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Sub Display</th>
                    <th>Brand</th>
                    <th>SKU</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in tableSub"
                    :key="i"
                    v-show="!item.f_delete"
                  >
                    <td>{{ item.sub_display }}</td>
                    <td>{{ viewBrand(item.brand) }}</td>
                    <td>{{ item.sku }}</td>
                    <td>
                      <div class="d-flex gap-2">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="removeSub(i)"
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                        <button
                          class="btn btn-danger btn-sm"
                          type="button"
                          @click="updateSubDisplay(item)"
                          v-if="!!item.id"
                        >
                          <KTIcon icon-name="pencil" icon-class="fs-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!tableSub.filter(({ f_delete }) => !f_delete)[0]">
                    <th colspan="4" class="text-center">No data found</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-2 fw-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Sub Display</label
                >
                <el-form-item>
                  <el-input
                    v-model="sub.first"
                    :class="{ 'is-disabled': update.sub }"
                    type="text"
                    ref="subFirst"
                    @keydown.enter.prevent="
                      () => {
                        subSecond.focus();
                      }
                    "
                    :readonly="update.sub"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-2 fw-row">
                <label class="fs-6 fw-semobold mb-2">&nbsp;</label>
                <el-form-item>
                  <el-input
                    v-model="sub.second"
                    :class="{ 'is-disabled': update.sub }"
                    type="text"
                    ref="subSecond"
                    @keydown.enter.prevent="
                      () => {
                        brand.focus();
                      }
                    "
                    :readonly="update.sub"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-3 fw-row">
                <label class="fs-6 fw-semobold mb-2">Brand</label>
                <el-form-item class="w-100">
                  <Multiselect
                    v-model="sub.brand"
                    :searchable="true"
                    :options="option.brand"
                    placeholder="Select"
                    ref="brand"
                    @keydown.enter.prevent="
                      () => {
                        sku.focus();
                      }
                    "
                    @select="
                      (id, _) => {
                        sub.brand = id;
                      }
                    "
                    @click="
                      () => {
                        option.brand.forEach((element) => {
                          if (sub.brand == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-4 fw-row">
                <label class="fs-6 fw-semobold mb-2">SKU</label>
                <el-form-item>
                  <el-input
                    v-model="sub.sku"
                    type="number"
                    ref="sku"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <div class="col-1 fw-row">
                <div class="fv-row mt-8">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="addSubDisplay()"
                    :disabled="dsbSubDisplay()"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="col-12 fw-row">
                <button
                  type="button"
                  class="btn btn-submit float-end"
                  @click="AddDisplay()"
                  :disabled="dsbDisplay()"
                >
                  Tambahkan Data Display
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-danger"
              type="submit"
              :disabled="dsbSubmit()"
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

<style lang="scss">
input[type="text"] {
  text-transform: uppercase;
}
.hr-border {
  position: relative;
  margin-bottom: 24px;
  .hr-title {
    position: absolute;
    position: absolute;
    top: -15px;
    background-color: white;
    padding: 4px 3px;
    font-weight: 500;
    color: #878d95;
  }
}
.btn-clear {
  color: var(--bs-danger-active);
}
.btn-submit {
  border: 1px solid #b7bbc0 !important;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from "vue";
import Multiselect from "@vueform/multiselect";
import {
  bisnisUnit,
  brand,
  alamat,
  viewSetting,
} from "@/stores/displayPercabang";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import { hideModal } from "@/core/helpers/dom";
import Copy from "../../../../helper/coppied";

type SubDisplay = {
  id?: number;
  f_delete?: boolean;
  sub_display: string;
  brand: string;
  sku: string;
};

type Display = {
  idx: number;
  id?: number;
  f_delete?: boolean;
  display: string;
  alamat_display: string;
  sub_denah_display?: any;
  sub_display: SubDisplay[];
};

type Option = {
  label: string;
  value: string;
};
const defSub = {
  id: null,
  f_delete: false,
  first: "",
  second: "",
  brand: "",
  sku: "",
};
const defDisplay = {
  idx: 0,
  id: null,
  f_delete: false,
  first: "",
  second: "",
  alamat_display: "",
  sub_denah_display: null,
};
export default defineComponent({
  name: "MasterSusunanDisplayPercabangModal",
  components: {
    Multiselect,
  },
  data() {
    return {
      inputFile: true,
      loading: false,
      cabang: {
        plant_code: "",
        plant_name: "",
        bisnis_unit: "",
        bisnis_unit_id: "",
      },
      display_denah: "",
      form: {
        display_cabang_id: "",
        display_denah: null,
      },
      display: { ...defDisplay },
      update: {
        display: false,
        sub: false,
      },
      sub: { ...defSub },
      option: {
        alamat_display: [] as Option[],
        brand: [] as Option[],
      },
      tableDisplay: [] as Display[],
      tableSub: [] as SubDisplay[],
      detailImage: {
        showImage: false,
        name: "",
        url: "",
      },
      detailImage1: {
        showImage1: false,
        name1: "",
        url1: "",
      },
      image: {
        display_denah: [] as any,
        sub_denah_display: [] as any,
      },
    };
  },
  created() {
    watch(
      () => bisnisUnit.data,
      (data) => {
        this.cabang = {
          bisnis_unit: data.bisnis_unit,
          plant_code: data.plant_code,
          plant_name: data.plant_name,
          bisnis_unit_id: data.bisnis_unit_id,
        };
      }
    );
    watch(
      () => brand.data,
      (data) => {
        this.option.brand = data;
      }
    );
    watch(
      () => alamat.data,
      (data) => {
        this.option.alamat_display = data;
      }
    );
    watch(
      () => viewSetting.data,
      (data) => {
        this.detailImage.showImage = false;
        this.detailImage1.showImage1 = false;
        this.detailImage1.name1 = "";
        this.detailImage.name = "";
        const { record } = data;
        this.tableDisplay = [];
        this.tableSub = [];
        this.display_denah = "";
        this.display = { ...defDisplay };
        this.sub = { ...defSub };
        this.update = {
          display: false,
          sub: false,
        };
        this.image = {
          display_denah: [],
          sub_denah_display: [],
        };

        this.form = {
          display_cabang_id: "",
          display_denah: null,
        };

        if (this.sub_display) {
          this.sub_display.value = "";
        }
        if (this.denah) {
          this.denah.value = "";
        }

        if (record) {
          const { display, display_denah, display_cabang_id } = record as any;

          this.display_denah = display_denah;
          this.form = {
            ...this.form,
            display_cabang_id,
          };

          this.tableDisplay = display.map((item, i) => {
            return {
              idx: i,
              id: item.id,
              f_delete: false,
              display: item.display,
              alamat_display: item.alamat_display,
              sub_denah_display: item.sub_denah_display,
              sub_display: item.sub_display.map((sub) => ({
                id: sub.id,
                f_delete: false,
                sub_display: sub.sub_display,
                brand: sub.brand?.mat_group_id,
                sku: sub.sku,
              })),
            };
          });
        }
      }
    );
  },
  methods: {
    async resetForm() {
      this.inputFile = false;
      await nextTick();
      this.inputFile = true;
    },
    displayImage(name) {
      this.detailImage.showImage = true;
      if (name) {
        this.detailImage.name = name;
        this.detailImage.url = name;
      }
    },
    displayImage1(name1) {
      this.detailImage1.showImage1 = true;
      if (name1) {
        this.detailImage1.name1 = name1;
        this.detailImage1.url1 = name1;
      }
    },
    alert(data) {
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
      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    },
    async updateForm() {
      const reqBody: any = {
        display_cabang_id: this.form.display_cabang_id,
        display: [],
      };

      for (let index = 0; index < this.tableDisplay.length; index++) {
        const d = this.tableDisplay[index];
        const display: any = {
          id: d.id,
          alamat_display: d.alamat_display,
          display: d.display,
          f_delete: d.f_delete,
          subdisplay: d.sub_display.map((sub) => ({
            id: sub.id,
            sub_display: sub.sub_display,
            sku: sub.sku,
            brand: sub.brand,
            f_delete: sub.f_delete,
          })),
        };
        if (!d.id) {
          display.sub_denah_display = await this.getBase64(d.sub_denah_display);
        }
        reqBody.display.push(display);
      }

      if (this.form.display_denah) {
        reqBody.display_denah = await this.getBase64(this.form.display_denah);
      }

      try {
        const { data } = await ApiService.put("display", reqBody);
        this.alert(data);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async createForm() {
      const sub_display: any = [];
      const reqBody = {
        cabang_bisnis_unit_id: this.cabang.bisnis_unit_id,
        denah: this.form.display_denah,
        display: {
          display: this.tableDisplay.map((d) => {
            sub_display.push(d.sub_denah_display);
            const display = {
              display: d.display,
              alamat_display: d.alamat_display,
              sub_display: d.sub_display.map((sub) => ({
                sub_display: sub.sub_display,
                brand: sub.brand,
                sku: sub.sku,
              })),
            };
            return display;
          }),
        },
      };

      const formData = new FormData();
      formData.append("cabang_bisnis_unit_id", reqBody.cabang_bisnis_unit_id);
      formData.append("display", JSON.stringify(reqBody.display));
      if (reqBody.denah) formData.append("denah", reqBody.denah);

      sub_display.forEach((element) => {
        if (element) formData.append("sub_display", element);
      });
      try {
        const { data } = await ApiService.post("display", formData);
        this.alert(data);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
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
        this.loading = false;
        return;
      }

      if (this.form.display_cabang_id) {
        this.updateForm();
      } else {
        this.createForm();
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    },

    handleFileDenah(e) {
      const file: any = e.target.files[0];
      this.form.display_denah = file;
    },

    handleFileSub(e) {
      const file: any = e.target.files[0];
      this.display.sub_denah_display = file;
    },

    viewBrand(id) {
      const find = this.option.brand.find(({ value }) => value === id);
      if (find) {
        return find.label;
      }
      return "-";
    },
    addSubDisplay() {
      const idSUb = this.sub.id;
      if (idSUb) {
        const idx = this.tableSub.findIndex(({ id }) => id === idSUb);

        this.tableSub[idx] = {
          ...this.tableSub[idx],
          brand: this.sub.brand,
          sku: this.sub.sku,
          sub_display: this.sub.first + this.sub.second,
        };
      } else {
        this.tableSub.push({
          brand: this.sub.brand,
          sku: this.sub.sku.toUpperCase(),
          sub_display:
            this.sub.first.toUpperCase() + this.sub.second.toUpperCase(),
          f_delete: false,
        });
      }

      this.sub = defSub;
      this.update.sub = false;
    },
    dsbSubDisplay() {
      const { first, second } = this.sub;
      if (!this.update.sub) {
        return !first || !second;
      }
      return false;
    },
    updateSubDisplay(row) {
      this.sub = {
        brand: row.brand,
        f_delete: row.f_delete,
        first: row.sub_display,
        second: "",
        id: row.id ?? "",
        sku: row.sku,
      };
      this.update.sub = !!row.id;
    },
    removeSub(index) {
      const { id } = this.tableSub[index];
      if (id) {
        this.tableSub[index].f_delete = true;
      } else {
        this.tableSub.splice(index, 1);
      }
    },

    removeDisplay(index) {
      const { id } = this.tableDisplay[index];
      if (id) {
        this.tableDisplay[index].f_delete = true;
      } else {
        this.tableDisplay.splice(index, 1);
      }
      this.tableSub = [];
      this.display = defDisplay;
      this.sub = defSub;
      this.update = {
        display: false,
        sub: false,
      };
    },
    AddDisplay() {
      const { id, idx } = this.display;
      if (id) {
        this.tableDisplay[idx] = {
          ...this.tableDisplay[idx],
          alamat_display: this.display.alamat_display,
          display: this.display.first,
          sub_display: this.tableSub,
          sub_denah_display: this.display.sub_denah_display,
        };
      } else {
        this.tableDisplay.push({
          alamat_display: this.display.alamat_display,
          display:
            this.display.first.toUpperCase() +
            this.display.second.toUpperCase(),
          idx: this.tableDisplay.length,
          sub_display: this.tableSub,
          f_delete: false,
          sub_denah_display: this.display.sub_denah_display,
        });
      }

      this.tableSub = [];
      this.display = defDisplay;
      this.update.display = false;
    },
    updateDisplay(row) {
      this.display = {
        idx: row.idx,
        id: row.id ?? "",
        first: row.display,
        second: row.second ?? "",
        alamat_display: row.alamat_display,
        f_delete: row.f_delete,
        sub_denah_display: row.sub_denah_display,
      };

      this.update.display = !!row.id;
      const res: SubDisplay[] = [];
      row.sub_display.forEach((element) => {
        res.push({
          id: element.id,
          brand: element.brand,
          sku: element.sku,
          sub_display: element.sub_display,
          f_delete: element.f_delete,
        });
      });
      this.tableSub = res;
      if (this.sub_display) {
        this.sub_display.value = "";
      }
    },
    dsbDisplay() {
      const { id, first, second, sub_denah_display } = this.display;
      let disabled = true;
      if (!id) {
        disabled = !first || !second || !sub_denah_display;
      }

      const tblSub = this.tableSub.filter((item) => !item.f_delete);
      disabled = !tblSub[0] || !sub_denah_display;

      return disabled;
    },
    dsbSubmit() {
      let disable = !this.tableDisplay[0];
      if (!this.form.display_cabang_id) {
        disable = !this.form.display_denah;
      }

      return disable;
    },
    async addImage(key) {
      let file = this.display.sub_denah_display;
      if (key === "display_denah") {
        file = this.form.display_denah;
      }

      if (!file) {
        Swal.fire({
          text: "Please input image",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return;
      }

      if (this.image[key][0]) this.image[key][0] = file;
      else {
        this.image[key].push(file);
      }
      this.inputFile = false;
      await nextTick();
      this.inputFile = true;
    },
    delImage(idx, key) {
      if (key === "display_denah") {
        if (this.denah) {
          this.denah.value = "";
        }
      } else {
        if (this.sub_display) {
          this.sub_display.value = "";
        }
      }
      this.image[key].splice(idx, 1);
    },

    urlLocal(file) {
      const url = URL.createObjectURL(file);
      return url;
    },
    viewOpen(file) {
      const url = this.urlLocal(file);
      window.open(url);
    },
  },

  setup() {
    const modalRef = ref<HTMLDivElement | null>(null);
    const formRef = ref<HTMLFormElement | null>(null);
    const sub_display = ref<HTMLInputElement | null>(null);
    const denah = ref<HTMLInputElement>();
    const diplayFirst = ref();
    const diplaySecond = ref();
    const alamat = ref();
    const subFirst = ref();
    const subSecond = ref();
    const brand = ref();
    const sku = ref();
    return {
      modalRef,
      formRef,
      sub_display,
      denah,
      diplayFirst,
      diplaySecond,
      alamat,
      subFirst,
      subSecond,
      brand,
      sku,
      Copy,
    };
  },
});
</script>
