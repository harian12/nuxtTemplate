<template>
  <div
    class="modal fade"
    id="kt_modal_add_singlevoucher"
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
        <div class="modal-header" id="kt_modal_add_singlevoucher_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Voucher</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_singlevoucher_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="resetForm"
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
              id="kt_modal_add_singlevoucher_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_singlevoucher_header"
              data-kt-scroll-wrappers="#kt_modal_add_singlevoucher_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Company</label
                  >

                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    @change="changeGroupVoucher($event)"
                    @select="
                      (id, _) => {
                        formData.company = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsCompany.forEach((element) => {
                          if (formData.company == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Bisnis Unit</label
                  >

                  <Multiselect
                    v-model="formData.bisnis"
                    :searchable="true"
                    :options="formData.optionsBisnis"
                    placeholder="Select"
                    @select="
                      (id, _) => {
                        formData.bisnis = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsBisnis.forEach((element) => {
                          if (formData.bisnis == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-3 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Sales Org</label>

                  <Multiselect
                    v-model="formData.sales_org"
                    :searchable="true"
                    :options="formData.optionsSalesorg"
                    placeholder="Select"
                    @select="
                      (id, _) => {
                        formData.sales_org = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsSalesorg.forEach((element) => {
                          if (formData.sales_org == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <!--end::Col-->
              </div>
              <br />
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kepemilikan</label
                  >

                  <Multiselect
                    v-model="formData.ownership"
                    :searchable="false"
                    :options="formData.optionsMilik"
                    placeholder="Select"
                    @select="
                      (id, _) => {
                        formData.ownership = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsMilik.forEach((element) => {
                          console.log(element);

                          if (formData.ownership == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Voucher Group</label
                  >

                  <Multiselect
                    v-model="formData.voucher_group"
                    :searchable="true"
                    mo
                    :options="formData.optionsVoucher"
                    placeholder="Select"
                    @change="checkSellFlag($event)"
                    @select="
                      (id, _) => {
                        formData.voucher_group = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsVoucher.forEach((element) => {
                          if (formData.voucher_group == element.value) {
                            Copy(element.label);
                          }
                        });
                      }
                    "
                    disabled
                  ></Multiselect>
                </div>
                <!--end::Col-->
              </div>

              <br />
              <hr />

              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Voucher</label
                  >

                  <el-form-item prop="voucher_code">
                    <el-input
                      v-model="formData.voucher_code"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->

                <!--begin::Input group-->
                <div class="col-md-8 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nama Voucher</label
                  >
                  <el-form-item prop="voucher_name">
                    <el-input
                      v-model="formData.voucher_name"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>

              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >E-Voucher</label
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
                      @click="
                        () => {
                          formData.e_voucher = !formData.e_voucher;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.e_voucher ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Presentase</label
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
                      @click="
                        () => {
                          formData.type_amount = !formData.type_amount;
                          formData.value = '0';
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.type_amount ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Pengganti</label
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
                      @click="
                        () => {
                          formData.subs = !formData.subs;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.subs ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>

              <div class="row mt-5">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Fixed Amount</label>
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
                      :checked="formData.fix_amount"
                      @click="
                        () => {
                          formData.fix_amount = !formData.fix_amount;
                          if (!formData.fix_amount) {
                            formData.value = '0';
                          }
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.fix_amount ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Nilai Voucher</label>

                  <el-form-item prop="value">
                    <el-input
                      v-model="formData.value"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                      :disabled="!formData.fix_amount"
                      @keyup="changeNilaiVoucher(formData.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Discount Voucher</label
                  >

                  <el-form-item prop="discount_v">
                    <el-input
                      v-model="formData.discount_v"
                      type="number"
                      placeholder=""
                      :disabled="formData.fix_amount"
                      @keyup="changeNilaiVoucher(formData.discount_v, 'disc')"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
              </div>

              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Generate</label>
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
                      :checked="formData.generate"
                      @click="
                        () => {
                          formData.generate = !formData.generate;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.generate ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Expiry Day</label
                  >

                  <el-form-item prop="expiry">
                    <el-input
                      v-model="formData.expiry"
                      type="number"
                      placeholder=""
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Validasi</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexSwitchChecked"
                      :checked="formData.voucher_validasi"
                      @click="
                        () => {
                          formData.voucher_validasi =
                            !formData.voucher_validasi;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.voucher_validasi ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>

              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Issue</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexSwitchChecked"
                      @click="
                        () => {
                          formData.issued = !formData.issued;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.issued ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Issue Day</label
                  >
                  <el-form-item prop="issue_day">
                    <el-input
                      v-model="formData.issue_day"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      :disabled="!formData.issued"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Multi Use</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexSwitchChecked"
                      :checked="formData.multi_use"
                      @click="
                        () => {
                          formData.multi_use = !formData.multi_use;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.multi_use ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>

              <div class="row">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kerjasama</label
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
                      @click="
                        () => {
                          formData.kerjasama = !formData.kerjasama;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.kerjasama ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <!--begin::Col-->
                <div class="col-md-8 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Kode Kerjasama</label>

                  <el-form-item prop="code_kerjasama">
                    <el-input
                      v-model="formData.code_kerjasama"
                      type="text"
                      :disabled="!formData.kerjasama"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Col-->
                <!--end::Input group-->
              </div>

              <div class="row mt-5">
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >For Member</label
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
                      @click="
                        () => {
                          formData.member = !formData.member;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.member ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >For Email</label
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
                      @click="
                        () => {
                          formData.email = !formData.email;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.email ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">For HP</label>
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
                      @click="
                        () => {
                          formData.HP = !formData.HP;
                        }
                      "
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.HP ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>

              <div class="row mt-5">
                <!--begin::Input group-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Minimal Purchase</label
                  >

                  <el-form-item prop="min_transaction">
                    <el-input
                      v-model="formData.min_transaction"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                      @keyup="
                        changeNilaiVoucher(
                          formData.min_transaction,
                          'nilai',
                          'min'
                        )
                      "
                    />
                  </el-form-item>
                </div>
              </div>
              <br />
              <hr />
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Image URL</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(row, key) in formData.file" :key="key">
                    <td v-if="row.image != ''">{{ row.image }}</td>
                    <td v-if="row.image != ''">
                      <button
                        type="button"
                        class="btn btn-light"
                        style="background-color: transparent"
                        @click="delImage(row.image)"
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
                    >Upload File</label
                  >
                  <el-form-item prop="file">
                    <div class="input-group custom-file-button">
                      <input
                        type="file"
                        class="form-control form-select-sm"
                        accept="image/*"
                        @change="saveImage($event)"
                        id="inputGroupFile"
                        v-if="inputFile"
                      />
                    </div>
                    <span class="errMessageCustom">{{
                      errMessage["image"]
                    }}</span>
                  </el-form-item>
                </div>
                <div class="col-2 mt-8">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="saveTable()"
                  >
                    Upload
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
              ref="submitButtonRef"
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
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-singlevoucher-modal",
  components: { Multiselect },
  props: {
    data: Object,
    resetForm: Object,
    reload: Function,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref<boolean>(false);

    const formData = ref({
      kode: [],
      ownership: "",
      voucher_name: "",
      voucher_code: "",
      value: "0",
      e_voucher: false,
      fix_amount: true,
      sell_flag: false,
      multi_use: false,
      voucher_validasi: true,
      registrasi: true,
      dump_pos: true,
      member: false,
      email: false,
      HP: false,
      code_kerjasama: "",
      issue_day: "0",
      min_transaction: "",
      imagepath: [],
      file: <any>[],
      image: {
        name: "",
      },
      company: "",
      bisnis: "",
      sales_org: "",
      sales_org_id: "",
      salesorg: "",
      voucher_group: "",
      voucher_group_id: "",
      companyvalue: "",
      voucher_id: "",
      bisnis_id: "",
      editModal: true,
      company_id: "",
      optionsCompany: <any>[],
      optionsSalesorg: <any>[],
      optionsVoucher: <any>[],
      optionsBisnis: <any>[],
      milik: "",
      expiry: "",
      discount_v: "0",
      kerjasama: false,
      issued: false,
      subs: false,
      generate: false,
      type_amount: false,
      optionsMilik: [
        {
          value: "Milik sendiri",
          label: "Milik Sendiri",
        },
        {
          value: "Milik luar",
          label: "Milik Luar",
        },
      ],
      fJual: false,
      skuVoucher: "",
      optionsSKuVoucher: <any>[],
      emptyImage: false,
    });

    watch(
      () => [props.resetForm, props.data],
      (data) => {
        formData.value = { ...formData.value, ...data[0] };
        formRef?.value?.resetFields();

        if (data[1] != undefined) {
          formData.value.company = data[1].codeCompany;
          formData.value.bisnis = data[1].buinit;
          formData.value.sales_org = data[1].salesOrg;
          formData.value.ownership = data[1].pemilik;
          formData.value.voucher_group = data[1].groupVoucher;
        }
      }
    );

    const rules = ref({
      voucher_name: [
        {
          required: true,
          message: "Nama Voucher is required",
          trigger: "change",
        },
      ],
      imagepath: [
        {
          required: true,
          message: "File is required",
          trigger: "change",
        },
      ],

      voucher_code: [
        {
          required: true,
          message: "Kode Voucher is required",
          trigger: "change",
        },
      ],
      value: [
        {
          required: true,
          message: "Value is required",
          trigger: "change",
        },
      ],
      issue_day: [
        {
          required: true,
          message: "Issue Day is required",
          trigger: "change",
        },
      ],
      min_transaction: [
        {
          required: true,
          message: "Minimal Purchase is required",
          trigger: "change",
        },
      ],
      expiry: [
        {
          required: true,
          message: "Exp Day is required",
          trigger: "change",
        },
      ],
      discount_v: [
        {
          required: true,
          message: "Discount Voucher is required",
          trigger: "change",
        },
      ],
    });

    const voucerList: any = ref([]);
    let salesorgList: any = [];
    let bisnisList: any = [];
    let milikList: any = formData.value.optionsMilik;

    onMounted(async () => {
      let companyList: any = [];
      await ApiService.get("company")
        .then((data) => {
          data.data.data.forEach((val) => {
            companyList.push({
              value: val.company_id,
              label: val.company_code + "-" + val.company_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      formData.value.optionsCompany = companyList;

      let skuList: any = [];
      await ApiService.get("material").then((data) => {
        data.data.data.forEach((element, key) => {
          if (element.class_code != null) {
            skuList.push({
              value: element.material_id,
              label: `${element.material_code} - ${element.material_desc}`,
            });
          }
        });
      });

      formData.value.optionsSKuVoucher = skuList;
      formData.value.optionsCompany = companyList;
    });

    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const inputFile = ref(true);

    const saveTable = async () => {
      if (formData.value.file.length > 0) {
        formData.value.file = <any>[];
      }
      if (formData.value.image.name) {
        formData.value.file.push({
          image: formData.value.image.name,
          file: formData.value.image,
          matId: "",
        });
        inputFile.value = false;
        await nextTick();
        inputFile.value = true;
      } else {
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
      }
    };

    const delImage = async (key) => {
      let index = formData.value.file
        .map((x) => {
          return x.image;
        })
        .indexOf(key);

      formData.value.file.splice(index, 1);
    };

    const resetForm = () => {
      errMessage.value = [];
      formRef?.value?.resetFields();
    };

    const errMessage = ref<any>([]);
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
      errMessage.value = [];
      if (formData.value.file.length <= 1) {
        formData.value.file.forEach((val: any, key) => {
          if (val.image == "" && key > 0) {
            errMessage.value["image"] = "Upload image is required";
          }
        });
      }

      if (formData.value.file.length == 0) {
        errMessage.value["image"] = "Upload image is required";
      }
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          if (formData.value.file.length == 0) {
            return;
          }

          let file = new FormData();
          formData.value.file.forEach((val: any) => {
            if (val.file != "") {
              file.append("imagepath", val.file);
            }
          });
          file.append("voucher_group_id", formData.value.voucher_group);
          file.append("company_id", formData.value.company);
          //file.append("imagepath", formData.value.imagepath);
          file.append(
            "voucher_name",
            formData.value.voucher_name.toUpperCase()
          );
          file.append(
            "voucher_code",
            formData.value.voucher_code.toUpperCase()
          );
          file.append("value", formData.value.value.replace(".", ""));
          file.append("e_voucher", formData.value.e_voucher ? "Y" : "N");
          file.append("fix_amount", formData.value.fix_amount ? "Y" : "N");
          file.append("multi_use", formData.value.multi_use ? "Y" : "N");
          file.append(
            "voucher_validasi",
            formData.value.voucher_validasi ? "Y" : "N"
          );
          // file.append("registrasi", formData.value.registrasi ? "Y" : "N");
          // file.append("dump_pos", formData.value.dump_pos ? "Y" : "N");
          file.append("member", formData.value.member ? "Y" : "N");
          file.append("email", formData.value.email ? "Y" : "N");
          file.append("HP", formData.value.HP ? "Y" : "N");
          file.append("min_transaction", formData.value.min_transaction.replace(".", ""));
          file.append("issue_day", formData.value.issue_day);
          file.append("code_kerjasama", formData.value.code_kerjasama);
          file.append("sales_org_id", formData.value.sales_org ?? "");
          file.append("voucher_id", formData.value.voucher_id);
          file.append("ownership", formData.value.ownership);
          file.append("bisnis_unit", formData.value.bisnis);
          file.append("expiry", formData.value.expiry);
          file.append("discount_v", formData.value.discount_v);
          file.append("generate", formData.value.generate ? "Y" : "N");
          file.append("issued", formData.value.issued ? "Y" : "N");
          file.append("kerjasama", formData.value.kerjasama ? "Y" : "N");
          file.append("subs", formData.value.subs ? "Y" : "N");
          file.append("type_amount", formData.value.type_amount ? "Y" : "N");
          file.append("material_id", formData.value.skuVoucher ?? "");

          await ApiService.post("voucher", file).then((data) => {
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
                hideModal(addFormModalRef.value);
                emit('reload')
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
            }
          });
        }
      });
    };

    const checkSellFlag = (data) => {
      voucerList.value.forEach((element) => {
        if (data == element.voucher_group_id) {
          formData.value.fJual = element.sell_flag == "Y" ? true : false;
          formData.value.multi_use = formData.value.fJual;
        }
      });
    };

    const changeNilaiVoucher = (val, act: string = "nilai", type = "val") => {
      if (type == "min") {
        formData.value.min_transaction = val
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return;
      }

      if (act == "nilai") {
        if (Number(val) > 100 && formData.value.generate) {
          formData.value.value = "100";
        } else {
          let number = val
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

          formData.value.value = number;
        }
      } else {
        if (Number(val) > 100) {
          formData.value.discount_v = "100";
        }
      }
    };

    const changeGroupVoucher = async (data) => {
      let voucherList: any = [];
      await ApiService.get(`voucher-group?company_id=[${data}]`)
        .then((data) => {
          data.data.data.forEach((val) => {
            voucherList.push({
              value: val.voucher_group_id,
              label: val.voucher_group_name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get(`sales-organisasi?company_id=[${data}]`)
        .then((data) => {
          data.data.data.forEach((val) => {
            salesorgList.push({
              value: val.sales_org_id,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      await ApiService.get(`bisnis-unit?company_id=[${data}]`)
        .then((data) => {
          data.data.data.forEach((val) => {
            bisnisList.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      formData.value.optionsBisnis = bisnisList;
      formData.value.optionsSalesorg = salesorgList;
      formData.value.optionsVoucher = voucherList;
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addFormModalRef,
      submitButtonRef,
      getAssetPath,
      countries,
      Multiselect,
      saveImage,
      checkSellFlag,
      changeNilaiVoucher,
      changeGroupVoucher,
      resetForm,
      Copy,
      saveTable,
      delImage,
      errMessage,
      inputFile,
    };
  },
});
</script>
