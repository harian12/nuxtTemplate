<template>
  <div
    class="modal fade"
    id="kt_modal_master_pembayaran_paylater_form"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <el-form
          @submit.prevent="onSubmit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <div
            class="modal-header"
            id="kt_modal_master_pembayaran_paylater_form"
          >
            <h2 class="fw-bold">{{ title }}</h2>
            <div
              id="close_modal_form"
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
          </div>
          <div class="modal-body py-10 px-lg-17">
            <div class="row">
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="company">
                  <label class="required fs-5 fw-semobold mb-2">Company</label>
                  <Multiselect
                    v-model="formData.company_id"
                    :searchable="true"
                    :options="option.companies"
                    placeholder="Select"
                    ref="company"
                    :disabled="isDisableCompany || !!paylaterPaymentId"
                    @click="
                      Copy(
                        option.companies.find(
                          (x) => x['value'] === formData?.company_id
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        businessUnite.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="bisnisUnit">
                  <label class="required fs-5 fw-semobold mb-2"
                    >Bisnis Unit</label
                  >
                  <Multiselect
                    class="bisnis-unit"
                    v-model="formData.bisnis_unit_id"
                    :searchable="true"
                    :close-on-select="false"
                    :groups="true"
                    mode="tags"
                    :options="option.businessUnites"
                    placeholder="Select"
                    ref="businessUnite"
                    :disabled="isDisableBisnisUnit || !!paylaterPaymentId"
                    @click="
                      Copy(
                        option.businessUnites.find(
                          (x) => x['value'] === formData?.bisnis_unit_id
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        jenisPayLater.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <label class="required fs-5 fw-semobold mb-2"
                  >Jenis Paylater</label
                >
                <el-form-item prop="jenis_paylater">
                  <div class="input-group input-group-sm flex-nowrap">
                    <input
                      ref="jenisPayLater"
                      v-model="formData.jenis_paylater"
                      type="text"
                      class="form-control"
                      :disabled="
                        formMode === 'view mode' || !!paylaterPaymentId
                      "
                      @click="Copy(formData.jenis_paylater)"
                      @keydown.enter.prevent="
                        () => {
                          bin.focus();
                        }
                      "
                    />
                  </div>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <label class="required fs-5 fw-semobold mb-2">BIN</label>
                <el-form-item prop="bin_id">
                  <Multiselect
                    ref="bin_id"
                    v-model="formData.bin_id"
                    :searchable="true"
                    :options="option.bins"
                    placeholder="Select"
                    :disabled="!!paylaterPaymentId"
                    @click="
                      Copy(
                        option.bins.find((x) => x['value'] === formData?.bin_id)
                          ?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        merchant.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>

              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="paylater_merchant">
                  <label class="required fs-5 fw-semobold mb-2">Merchant</label>
                  <Multiselect
                    v-model="formData.paylater_merchant"
                    :searchable="true"
                    :options="option.merchant"
                    placeholder="Select"
                    ref="merchant"
                    :disabled="formMode == 'view mode'"
                    @click="
                      Copy(
                        option.merchant.find(
                          (x) => x['value'] === formData?.paylater_merchant
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        termin.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>

              <div class="col-12 col-md-6 fv-row mt-2">
                <label class="fs-5 fw-semobold mb-2">Mesin Share</label>
                <div class="input-group input-group-sm flex-nowrap mt-3">
                  <input
                    v-model="formData.mesin_share"
                    type="text"
                    class="form-control"
                    disabled
                    @click="Copy(formData.mesin_share)"
                  />
                </div>
              </div>

              <div class="col-12 fv-row mt-2">
                <div class="d-flex gap-3 justify-content-between">
                  <div
                    class="form-check form-switch form-check-custom form-check-solid mt-10"
                  >
                    <input
                      class="form-check-input"
                      v-model="formData.proses_via_edc"
                      type="checkbox"
                      :disabled="formMode == 'view mode'"
                      ref="processViaEdc"
                    />
                    <label
                      class="form-check-label required"
                      for="flexSwitchChecked"
                    >
                      Proses via EDC
                    </label>
                  </div>
                  <div
                    class="form-check form-switch form-check-custom form-check-solid mt-9"
                  >
                    <input
                      class="form-check-input"
                      v-model="formData.edc_sharing"
                      type="checkbox"
                      disabled
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      EDC sharing
                    </label>
                  </div>
                  <div class="d-flex gap-3">
                    <div
                      class="form-check form-switch form-check-custom form-check-solid mt-9 disabled"
                    >
                      <input
                        class="form-check-input"
                        v-model="formData.menggunakan_ecr"
                        type="checkbox"
                        disabled
                      />
                      <label class="form-check-label" for="flexSwitchChecked">
                        Menggunakan ECR
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-4 mb-5 mt-10" style="width: 10%">Image</div>
              <div class="col-8 mt-10" style="width: 90%"><hr /></div>

              <div class="col-12">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Image URL</th>
                      <th>Action</th>
                    </tr>
                    <tr v-for="(row, key) in mapData" :key="key">
                      <td>{{ row.image }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-light"
                          style="background-color: transparent"
                          @click="delImage(row.image)"
                          :disabled="!!paylaterPaymentId"
                        >
                          <i class="fa fa-close" style="color: red"></i>
                        </button>
                        <a
                          target="_blank"
                          class="btn btn-light"
                          @click="displayImage(row.image)"
                          v-if="formMode == 'view mode'"
                        >
                          <i
                            class="fa fa-eye"
                            :style="{
                              color:
                                row.image == detailImage.name
                                  ? '#af272f'
                                  : '',
                            }"
                          ></i
                        ></a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="row">
                  <div class="col-8" style="padding-left: 13px !important" v-if="formMode !== 'view mode'">
                    <label class="required fs-6 fw-semobold mb-2"
                      >Upload Image</label
                    >
                    <el-form-item prop="file">
                      <div class="input-group custom-file-button">
                        <input
                          type="file"
                          class="form-control form-select-sm"
                          accept="image/*"
                          id="inputGroupFile"
                          ref="inputGroupFile"
                          @change="onHandelImage($event)"

                          v-if="inputFile"
                        />
                      </div>
                      <span class="errMessageCustom" v-if="formData.errImage"
                        >Upload image is required</span
                      >
                    </el-form-item>
                  </div>
                  <div class="col-2 mt-8" v-if="formMode !== 'view mode'">
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="saveTable()"

                    >
                      Upload
                    </button>
                  </div>
                  <!-- <div class="col-8" style="padding-left: 13px !important;">
                    <label class="required fs-6 fw-semobold mb-2">File</label>
                    <el-form-item>
                      <el-input
                        v-model="formValue.image"
                        type="text"
                        placeholder=""
                        disabled
                      />
                    </el-form-item>
                  </div> -->
                  <!-- <div class="col-2 mt-10">
                    <a
                      target="_blank"
                      @click="displayImage(formValue.image)"
                      :style="{
                        backgroundColor:
                          formValue.image == detailImage.name ? '#fbe1d4' : '',
                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </a>
                  </div> -->
                </div>
              </div>
              <br />
              <div id="imageshow" class="card bg-light shadow-sm" v-if="detailImage.showImage">
                <div class="card-header">
                  <h3 class="card-title">{{ detailImage.name }}</h3>
                  <div class="card-toolbar">
                    <a
                      @click="closeImage()"
                      class="btn btn-icon btn-sm btn-active-icon-primary active"
                      data-kt-card-action="remove"
                      data-kt-card-confirm="true"
                      data-kt-card-confirm-message="Are you sure to remove this card ?"
                      data-bs-toggle="tooltip"
                      title="Remove card"
                      data-bs-dismiss="click"
                    >
                      <i class="ki-duotone ki-cross fs-1"
                      ><span class="path1"></span><span class="path2"></span
                      ></i>
                    </a>
                  </div>
                </div>
                <div class="card-body card-scroll h-350px">
                  <img
                    :src="'http://' + detailImage.url"
                    class="w-500px me-3"
                    alt="image"
                  />
                </div>
              </div>


              <div class="col-4 mb-10 mt-5" style="width: 10%">Termin</div>
              <div class="col-8 mt-5" style="width: 90%"><hr /></div>

              <div class="table-responsive mb-4">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Termin</th>
                      <th>Disc Rate</th>
                      <th>Tanggal berlaku</th>
                      <th v-if="formMode !== 'view mode'">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in formData.termin" :key="index">
                      <template v-if="!row.f_deleted">
                        <td>{{ row.termin }}</td>
                        <td>{{ row.disc_rate }}</td>
                        <td>{{ row.tgl_berlaku }}</td>
                        <td v-if="formMode !== 'view mode'">
                          <button
                            type="button"
                            class="btn btn-sm"
                            @click="onDeleteTermin(index)"
                          >
                            <i class="fa fa-trash" style="color: red"></i>
                          </button>
                        </td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="formMode !== 'view mode'">
                <div class="d-flex gap-5">
                  <div class="row">
                    <div class="col-4">
                      <el-form-item prop="termin">
                        <label class="fs-5 fw-semobold mb-2">Termin</label>
                        <div class="input-group input-group-sm flex-nowrap">
                          <input
                            v-model="formDataTermin.termin"
                            type="number"
                            class="form-control"
                            ref="termin"
                            :disabled="formMode === 'view mode'"
                            @click="Copy(formDataTermin.termin)"
                            @keydown.enter.prevent="
                              () => {
                                discRate.focus();
                              }
                            "
                          />
                          <span class="input-group-text">Bulan</span>
                        </div>
                      </el-form-item>
                    </div>
                    <div class="col-4">
                      <el-form-item prop="disc_rate">
                        <label class="fs-5 fw-semobold mb-2">Disc rate</label>
                        <div class="input-group input-group-sm flex-nowrap">
                          <input
                            v-model="formDataTermin.disc_rate"
                            type="number"
                            class="form-control"
                            ref="discRate"
                            :disabled="formMode === 'view mode'"
                            @click="Copy(formDataTermin.disc_rate)"
                            @keyup="
                              () => {
                                if (Number(formDataTermin.disc_rate) > 100) {
                                  formDataTermin.disc_rate = '100';
                                } else {
                                  formDataTermin.disc_rate =
                                    formDataTermin.disc_rate;
                                }
                              }
                            "
                          />
                        </div>
                      </el-form-item>
                    </div>
                    <div class="col-4">
                      <el-form-item prop="tglBerlaku">
                        <label class="fs-6 fw-semobold mb-2"
                          >Tanggal berlaku</label
                        >
                        <div class="input-group input-group-sm flex-nowrap">
                          <el-input
                            v-model="formDataTermin.tgl_berlaku"
                            type="date"
                            ref="tglBerlaku"
                            :disabled="formMode === 'view mode'"
                            @click="Copy(formDataTermin.tgl_berlaku)"
                          />
                        </div>
                      </el-form-item>
                    </div>
                  </div>
                  <button
                    style="height: fit-content"
                    type="button"
                    class="btn btn-danger btn-sm mt-11"
                    @click="onAddTermin()"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="formMode !== 'view mode'" class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="isLoading ? 'on' : null"
              class="btn btn-danger"
              type="submit"
            >
              <span v-if="!isLoading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-5 me-2 me-0" />
              </span>
              <span v-if="isLoading" class="indicator-progress">
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
import { defineComponent, nextTick, onBeforeMount, ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import Copy from "@/helper/coppied";

export default defineComponent({
  name: "form-master-pembayaran-paylater",
  components: {
    Multiselect,
  },

  props: ["title", "formValue", "formMode"],

  emits: ["refresh"],

  setup(props, { emit }) {
    const businessUnite = ref();
    const jenisPayLater = ref();
    const paylaterId = ref();
    const bin = ref();
    const merchant = ref();
    const processViaEdc = ref();
    const termin = ref();
    const discRate = ref();
    const option: any = ref({
      companies: [],
      businessUnites: {
        label: "Select All",
        options: [],
      },
      merchant: [],
      bins: [],
    });
    const formDataTermin = ref({
      id: "",
      termin: 0,
      disc_rate: "",
      tgl_berlaku: "",
    });
    const formData: any = ref({
      company_id: "",
      bisnis_unit_id: [],
      jenis_paylater: "",
      bin_id: "",
      paylater_merchant: "",
      proses_via_edc: "",
      edc_sharing: "", // autofill from master merchant
      menggunakan_ecr: "", // autofill from master merchant
      mesin_share: "", // autofill from master merchant
      file: [
        {
          matId: "",
          image: "",
          file: {},
        },
      ],
      image: {
        name: "",
      },
      termin: [],
      errImage: false,
    });
    const detailImage = ref({
      showImage: false,
      name: "",
      url: "",
    });
    const rules = ref({
      company_id: [
        {
          required: true,
          message: "Company is required",
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
      bisnis_unit_id: [
        {
          required: true,
          message: "Bisnis unit is required",
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
      paylater_merchant: [
        {
          required: true,
          message: "Merchant is required",
          trigger: "change",
        },
      ],
      jenis_paylater: [
        {
          required: true,
          message: "Jenis Paylater is required",
          trigger: "change",
        },
      ],
    });
    const preview = ref("");
    const paylaterPaymentId = ref("");
    const isLoading = ref(false);
    const isDisableCompany = ref(false);
    const isDisableBisnisUnit = ref(false);
    const isEdcSharing = ref(false);
    const isUsingEcr = ref(false);
    const formRef = ref<HTMLFormElement | null>(null);

    const inputFile = ref(true);

    const resetForm = async () => {
      inputFile.value = false;
      await nextTick();
      inputFile.value = true;
      // Reset field by rerender field
    };

    onBeforeMount(async () => {
      fetchCompanies();
      fetchBisnisUnit();
      fetchMerchant();
      fetchBin();
    });

    /**
     * @description Fetch companies from the API
     */
    const fetchCompanies = async () => {
      await ApiService.get("company")
        .then((res) => {
          option.value.companies = res.data.data.map((company) => {
            return {
              value: company.company_id,
              label: `${company.company_code}-${company.company_name}`,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    /**
     * @description Fetch merchant from the API
     */
    const fetchMerchant = async () => {
      await ApiService.get("merchant?status=[Active]")
        .then((res) => {
          option.value.merchant = res.data.data.map((item) => {
            return {
              value: item,
              label: item.merch_name,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    /**
     * @description Fetch bin from the API
     */
    const fetchBin = async () => {
      await ApiService.get("bin?search[status]=Active")
        .then((res) => {
          option.value.bins = res.data.data.map((item) => {
            return {
              value: item.bin_id,
              label: item.bin,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    /**
     * @description Fetch bisnis unit from the API
     */
    const fetchBisnisUnit = async () => {
      await ApiService.get("bisnis-unit")
        .then((res) => {
          option.value.businessUnites.options = res.data.data.map(
            (businessUnite) => {
              return {
                value: businessUnite.bisnis_unit_id,
                label: `${businessUnite.bisnis_unit_code}-${businessUnite.bisnis_unit}`,
              };
            }
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };

    /**
     * @description Save new data to the API
     * @param formDataPayload
     */
    const fetchSave = async (formDataPayload) => {
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
      }
      await ApiService.post("paylater", formDataPayload)
        .then((res) => {
          if (res.data.status_code == 200) {
            successAlert();
          } else {
            errorAlert(res.data.msg);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    /**
     * Update data to the API
     * @param formDataPayload
     */
    const fetchUpdate = async (formDataPayload) => {
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
      }
      await ApiService.put("paylater", formDataPayload)
        .then((res) => {
          if (res.data.status_code == 200) {
            successAlert();
          } else {
            errorAlert(res.data.msg);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    /**
     * @description Handle upload file
     * @param {event} e
     */
    const onHandelImage = (e) => {
      if (e.target.files[0]) {
        formData.value.file = e.target.files[0];
        preview.value = URL.createObjectURL(e.target.files[0]);
      } else {
        preview.value = "";
        formData.value.file = null;
      }
    };

    const closeImage = () => {
      detailImage.value.showImage = false;
      detailImage.value.name = "";
    };

    const displayImage = (name) => {
      detailImage.value.showImage = true;
      if (name) {
        detailImage.value.name = name;
        detailImage.value.url = name;
      }
    };

    const mapData = ref<Array<any>>([]);
    const saveTable = async () => {
      if (formData.value.file) {
        mapData.value.push({
          image: formData.value.file.name,
          file: formData.value.file,
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
      let index = mapData.value
        .map((x) => {
          return x.image;
        })
        .indexOf(key);

      mapData.value.splice(index, 1);
    };

    /**
     * @description add termin to the list
     */
    const onAddTermin = () => {
      if (
        formDataTermin.value.termin < 0 ||
        !formDataTermin.value.disc_rate ||
        !formDataTermin.value.tgl_berlaku
      )
        return;

      const foundTerminId = formData.value.termin.findIndex(
        (x) =>
          x.termin == formDataTermin.value.termin &&
          x.tgl_berlaku == formDataTermin.value.tgl_berlaku &&
          x.f_deleted == false
      );
      if (foundTerminId >= 0 && formData.value.termin.length > 0) {
        formData.value.termin[foundTerminId].disc_rate =
          formDataTermin.value.disc_rate;
      } else {
        formData.value.termin.push({
          termin: formDataTermin.value.termin,
          disc_rate: formDataTermin.value.disc_rate,
          tgl_berlaku: formDataTermin.value.tgl_berlaku,
          paylater_termin_id: "",
          f_deleted: false,
        });
      }

      formDataTermin.value = {
        termin: 0,
        disc_rate: "",
        tgl_berlaku: "",
        id: "",
      };
    };

    /**
     * @description remove termin from the list
     * @param arrId
     */
    const onDeleteTermin = (arrId) => {
      if (formData.value.termin[arrId].paylater_termin_id)
        formData.value.termin[arrId].f_deleted = true;
      else formData.value.termin.splice(arrId, 1);
    };

    /**
     * @description Handle submit form
     */
    const onSubmit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        if (mapData.value.length == 0) {
          formData.value.errImage = true;
        }
        if (valid) {
          isLoading.value = true;
          const formDataPayload = new FormData();
          if (paylaterId.value)
            formDataPayload.append("paylater_id", paylaterId.value);
          formDataPayload.append("company_id", formData.value.company_id);
          formDataPayload.append(
            "paylater_bisnis_unit",
            JSON.stringify(
              formData.value.bisnis_unit_id.map((x) => {
                return { bisnis_unit: x };
              })
            )
          );
          formDataPayload.append(
            "jenis_paylater",
            formData.value.jenis_paylater?.toUpperCase()
          );
          formDataPayload.append("bin_id", formData.value.bin_id);
          formDataPayload.append(
            "paylater_merchant",
            formData.value.paylater_merchant.merchant_id
          );
          formDataPayload.append(
            "proses_via_edc",
            formData.value.proses_via_edc ? "YES" : "NO"
          );
          if (formData.value.file) {
            formDataPayload.append("file", formData.value.file);
          }
          const mapTermin = { termin: formData.value.termin };

          formDataPayload.append("termin", JSON.stringify(mapTermin));

          if (paylaterPaymentId.value) fetchUpdate(formDataPayload);
          else fetchSave(formDataPayload);
        }
      });
    };

    /**
     * @description Alert success
     */
    const successAlert = () => {
      Swal.fire({
        text: "Form has been successfully submitted!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        emit("refresh");
        document.getElementById("close_modal_form")?.click();
      });
    };

    /**
     * @description Alert error
     * @param {string} message
     */

    const errorAlert = (message) => {
      Swal.fire({
        icon: "error",
        html: message,
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    };

    watch(props, (newVal) => {
      detailImage.value.showImage = false;
      detailImage.value.name = "";
      paylaterPaymentId.value = newVal.formValue?.id;
      mapData.value = [];
      if (
        newVal.formValue?.id &&
        newVal.title != "Add Master Pembayaran Paylater"
      ) {
        paylaterId.value = newVal.formValue.paylater_id;
        formData.value = {
          company_id: newVal.formValue.company_id,
          bisnis_unit_id: newVal.formValue.bisnis_unit_id,
          jenis_paylater: newVal.formValue.jenis_paylater,
          bin_id: newVal.formValue.bin_id,
          paylater_merchant: option.value.merchant.find(
            (item) => item.value.merchant_id == newVal.formValue.merchant_id
          )?.value,
          proses_via_edc:
            newVal.formValue.process_via_edc?.toLowerCase() == "yes",
          termin: newVal.formValue.termin,
        };
        mapData.value.push({ image: newVal.formValue.image });
      } else {
        paylaterId.value = null;
        formRef?.value?.resetFields();
        formData.value = {
          company_id: newVal.formValue.company_id,
          bisnis_unit_id: newVal.formValue.bisnis_unit_id,
          jenis_paylater: "",
          bin_id: "",
          paylater_merchant: "",
          proses_via_edc: "",
          edc_sharing: "", // autofill from master merchant
          menggunakan_ecr: "", // autofill from master merchant
          mesin_share: "", // autofill from master merchant
          file: null,
          termin: [],
        };
      }

      isDisableCompany.value = !!newVal.formValue.company_id;
      isDisableBisnisUnit.value = !!newVal.formValue.bisnis_unit_id;
    });

    watch(
      () => formData.value.paylater_merchant,
      (newVal) => {
        console.log(newVal);

        if (newVal) {
          formData.value.menggunakan_ecr = newVal?.ecr?.toLowerCase() === "yes";
          formData.value.edc_sharing = newVal?.share?.toLowerCase() === "yes";
          formData.value.mesin_share = newVal?.merchant_share_edc?.nama_mesin;
        }
      }
    );

    return {
      businessUnite,
      jenisPayLater,
      bin,
      merchant,
      processViaEdc,
      termin,
      discRate,
      option,
      formData,
      formDataTermin,
      rules,
      paylaterPaymentId,
      isLoading,
      isDisableCompany,
      isDisableBisnisUnit,
      onHandelImage,
      onSubmit,
      onAddTermin,
      formRef,
      isEdcSharing,
      isUsingEcr,
      onDeleteTermin,
      Copy,
      saveTable,
      delImage,
      mapData,
      detailImage,
      displayImage,
      inputFile,
      resetForm,
      closeImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.bisnis-unit.multiselect {
  height: 35px;
}
.btn-clear {
  color: orange;
}
.btn-outline-secondary {
  border: 1px solid #dbdfe9 !important;
}
.form-control {
  text-transform: uppercase;
}
</style>
