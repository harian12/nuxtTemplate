<template>
  <div
    class="modal fade"
    id="kt_modal_master_pembayaran_qris_form"
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
          <div class="modal-header" id="kt_modal_master_pembayaran_qris_form">
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
                <el-form-item prop="company_id">
                  <label class="required fs-5 fw-semobold mb-2">Company</label>
                  <Multiselect
                    v-model="formData.company_id"
                    :searchable="true"
                    :options="option.companies"
                    placeholder="Select"
                    ref="company"
                    :disabled="isDisableCompany || !!qrisPaymentId"
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
                <el-form-item prop="bisnis_unit_id">
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
                    :disabled="isDisableBisnisUnit || !!qrisPaymentId"
                    @click="
                      Copy(
                        option.businessUnites.options.find(
                          (x) => x['value'] === formData?.bisnis_unit_id
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        bank.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="card_center_id">
                  <label class="fs-5 fw-semobold mb-2">Bank</label>
                  <Multiselect
                    v-model="formData.card_center_id"
                    :searchable="true"
                    :options="option.banks"
                    placeholder="Select"
                    ref="bank"
                    :disabled="formData.fintech != null"
                    @click="
                      Copy(
                        option.banks.find(
                          (x) => x['value'] === formData?.card_center_id
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        uploadImage.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="bin_id">
                  <label class="required fs-5 fw-semobold mb-2">BIN</label>
                  <Multiselect
                    v-model="formData.bin_id"
                    :searchable="true"
                    :options="option.bins"
                    placeholder="Select"
                    ref="bin"
                    :disabled="!!qrisPaymentId"
                    @click="
                      Copy(
                        option.bins.find((x) => x['value'] === formData?.bin_id)
                          ?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        discRate.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="fintech">
                  <label class="fs-5 fw-semobold mb-2">Fintech</label>
                  <Multiselect
                    v-model="formData.fintech"
                    :searchable="true"
                    :options="option.fintechs"
                    placeholder="Select"
                    ref="fintech"
                    :disabled="formData.card_center_id != null"
                    @click="
                      Copy(
                        option.fintechs.find(
                          (x) => x['value'] === formData?.fintech
                        )?.label
                      )
                    "
                    @keydown.enter.prevent="
                      () => {
                        uploadImage.focus();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
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
                        >
                          <i class="fa fa-close" style="color: red"></i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="row">
                  <div class="col-8" style="padding-left: 13px !important">
                    <label class="required fs-6 fw-semobold mb-2">Image</label>
                    <el-form-item prop="file">
                      <div class="input-group custom-file-button">
                        <input
                          type="file"
                          class="form-control form-select-sm"
                          accept="image/*"
                          id="inputGroupFile"
                          ref="inputGroupFile"
                          @change="onHandelImage($event)"
                          :disabled="!!qrisPaymentId"
                          v-if="inputFile"
                        />
                      </div>
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
              <div class="col-md-11 fv-row" v-if="formValue.image">
                <label class="required fs-6 fw-semobold mb-2">File</label>
                <el-form-item>
                  <el-input
                    v-model="formValue.image"
                    type="text"
                    placeholder=""
                    disabled
                  />
                </el-form-item>
              </div>

              <div class="col-1 mt-10" v-if="formValue.image">
                <a
                  target="_blank"
                  @click="displayImage(formValue.image)"

                >
                  <i
                    class="fa fa-eye"
                    :style="{
                    color:
                      formValue.image == detailImage.name ? '#af272f' : '',
                  }"
                  ></i>
                </a>
              </div>
              <br />
              <div class="card bg-light shadow-sm" v-if="detailImage.showImage">
                <div class="card-header">
                  <h3 class="card-title">{{ detailImage.name }}</h3>
                  <div class="card-toolbar">
                    <a @click="closeImage()" class="btn btn-icon btn-sm btn-active-icon-primary active" data-bs-toggle="tooltip" title="Close Image" data-bs-dismiss="click">
                      <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
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

              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="disc_rate">
                  <label class="required fs-5 fw-semobold mb-2"
                    >Disc Rate</label
                  >
                  <div
                    class="input-group input-group-sm flex-nowrap"
                    @click="Copy(formData.disc_rate)"
                  >
                    <input
                      v-model="formData.disc_rate"
                      type="text"
                      class="form-control"
                      ref="discRate"
                      :readonly="formMode === 'view mode'"
                      @click="
                        Copy(
                          option.bins.find(
                            (x) => x['value'] === formData?.bin_id
                          )?.label
                        )
                      "
                      @keydown.enter.prevent="
                        () => {
                          tglBerlaku.focus();
                        }
                      "
                      @keyup="
                        () => {
                          if (Number(formData.disc_rate) > 100) {
                            formData.disc_rate = '100';
                          } else {
                            formData.disc_rate = formData.disc_rate;
                          }
                        }
                      "
                    />
                  </div>
                </el-form-item>
              </div>
              <div class="col-12 col-md-6 fv-row mt-2">
                <el-form-item prop="tgl_berlaku">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Tanggal berlaku</label
                  >
                  <div class="input-group input-group-sm flex-nowrap">
                    <el-input
                      type="date"
                      v-model="formData.tgl_berlaku"
                      ref="tglBerlaku"
                      :readonly="formMode === 'view mode'"
                      @click="Copy(formData.tgl_berlaku)"
                    />
                  </div>
                </el-form-item>
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
import { validate } from "@/core/helpers/validation";
import discRateHelper from "@/helper/discRate";

interface IOption {
  label: string;
  value: string;
}

interface IPembayaranQrisOptions {
  companies: IOption[];
  businessUnites: any;
  banks: IOption[];
  fintechs: IOption[];
  bins: IOption[];
}

export default defineComponent({
  name: "form-master-pembayaran-qris",
  components: {
    Multiselect,
  },

  props: ["title", "formValue", "formMode"],

  emits: ["refresh"],

  setup(props, { emit }) {
    const businessUnite = ref();
    const bank = ref();
    const fintech = ref();
    const uploadImage = ref();
    const bin = ref();
    const discRate = ref();
    const tglBerlaku = ref();
    const option = ref<IPembayaranQrisOptions>({
      companies: [],
      businessUnites: {
        label: "Select All",
        options: [],
      },
      banks: [],
      fintechs: [],
      bins: [],
    });
    const formData = ref({
      company_id: "",
      bin_id: "",
      bisnis_unit_id: [],
      card_center_id: "",
      fintech: "",
      disc_rate: "",
      tgl_berlaku: "",
      file: <any>[],
      image: {
        name: "",
      },
    });
    const detailImage = ref({
      showImage: false,
      name: "",
      url: "",
    });
    const rules = ref({
      company_id: [
        {
          required: false,
          message: "Company is required",
          trigger: "change",
        },
      ],
      bin_id: [
        {
          required: false,
          message: "Bin is required",
          trigger: "change",
        },
      ],
      bisnis_unit_id: [
        {
          required: false,
          message: "Bisnis unit is required",
          trigger: "change",
        },
      ],
      disc_rate: [
        {
          required: false,
          message: "Disc rate is required",
          trigger: "change",
        },
      ],
      tgl_berlaku: [
        {
          required: false,
          message: "Tanggal berlaku is required",
          trigger: "change",
        },
      ],
      // image: [
      //   {
      //     required: false,
      //     message: "Image berlaku is required",
      //     trigger: "change",
      //   },
      // ],
    });
    const preview = ref("");
    const qrisPaymentId = ref("");
    const isLoading = ref(false);
    const isDisableCompany = ref(false);
    const isDisableBisnisUnit = ref(false);
    const formRef = ref<HTMLFormElement | null>(null);
    const inputFile = ref(true);

    const resetForm = async () => {
      inputFile.value = false;
      await nextTick();
      inputFile.value = true;
      mapData.value = [];
      // Reset field by rerender field
    };

    onBeforeMount(async () => {
      fetchCompanies();
      fetchBisnisUnit();
      fetchBanks();
      fetchFintechs();
      //fetchBin();
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
     * @description Fetch bank from the API
     */
    const fetchBanks = async () => {
      await ApiService.get("card-center?status=Active")
        .then((res) => {
          option.value.banks = res.data.data.map((item) => {
            return {
              value: item.card_center_id,
              label: item.card_center_name,
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const fetchFintechs = async () => {
      let apiUrl = "jenis-fintech?search[status]=Active";
      //apiUrl = `${apiUrl}?company_id=[${company_id}]&bisnis_unit_id=[${bisnis_unit_id}]`;
      await ApiService.get(apiUrl)
        .then((res) => {
          option.value.fintechs = res.data.data.map((item) => {
            return {
              value: item.jenis_fintech_id,
              label: item.jenis_fintech || "-",
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
    const fetchBin = async (card_center_id: string = "") => {
      if (card_center_id) {
        let apiUrl = "bin";
        if (card_center_id)
          apiUrl = `${apiUrl}?search[status]=Active&card_center_id=[${card_center_id}]`;
        await ApiService.get(apiUrl)
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
      }
    };

    /**
     * @description Fetch bin from the API
     */
    const fetchBinTech = async (jenis_fintech_id: string = "") => {
      if (jenis_fintech_id) {
        let apiUrl = "jenis-fintech/setting";
        if (jenis_fintech_id)
          apiUrl = `${apiUrl}?jenis_fintech_id=${jenis_fintech_id}`;
        await ApiService.get(apiUrl)
          .then((res) => {
            option.value.bins = res.data.data.map((item) => {
              return {
                value: item.bin.bin_id,
                label: item.bin.bin,
              };
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
        return;
      }
      await ApiService.post("qris-payment", formDataPayload)
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
      await ApiService.put("qris-payment", formDataPayload)
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
      if(mapData.value.length > 0){
        mapData.value = <any>[];
      }

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
      let index = formData.value.file
        .map((x) => {
          return x.image;
        })
        .indexOf(key);

      formData.value.file.splice(index, 1);
    };

    const changeFieldNumber = (val, act = "fee", format = "rp") => {
      if (format == "rp") {
        let number = val
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        if (act == "fee") {
          formData.value.disc_rate = `${number}`;
        } else {
          formData.value.disc_rate = `${number}`;
        }
      } else {
        if (act == "disc_rate") {
          formData.value.disc_rate = discRateHelper(val);
        }
      }
    };

    /**
     * @description Handle submit form
     */
    const onSubmit = () => {
      if (!formRef.value) {
        return;
      }
      formRef.value.validate(async (valid: boolean) => {
        const invalid = await validate(rules, formData);
        if (invalid.length > 0) {
          return false;
        }

        if (valid) {
          isLoading.value = true;

          // Store to the API
          if (qrisPaymentId.value) {
            const payload = {
              disc_rate: formData.value.disc_rate.replace(",", "."),
              tgl_berlaku: formData.value.tgl_berlaku,
              qris_payment_id: qrisPaymentId.value,
            };
            fetchUpdate(payload);
          } else {
            const formDataPayload = new FormData();
            formDataPayload.append("company_id", formData.value.company_id);
            formDataPayload.append("bin_id", formData.value.bin_id);
            formDataPayload.append(
              "qris_bisnis_unit",
              JSON.stringify(
                formData.value.bisnis_unit_id.map((x) => {
                  return { bisnis_unit: x };
                })
              )
            );
            if (formData.value.card_center_id) {
              formDataPayload.append(
                "card_center_id",
                formData.value.card_center_id
              );
            }

            if (formData.value.fintech) {
              formDataPayload.append(
                "jenis_fintech_id",
                formData.value.fintech
              );
            }

            formDataPayload.append(
              "disc_rate",
              formData.value.disc_rate.replace(",", ".")
            );
            formDataPayload.append("tgl_berlaku", formData.value.tgl_berlaku);
            if (formData.value.file) {
              formDataPayload.append("file", formData.value.file);
            }
            fetchSave(formDataPayload);
          }
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
      qrisPaymentId.value = newVal.formValue?.qris_payment_id;
      if (!qrisPaymentId.value) formRef?.value?.resetFields();
      formData.value = {
        company_id: newVal.formValue.company_id,
        bin_id: newVal.formValue.bin_id,
        bisnis_unit_id: newVal.formValue.bisnis_unit_id,
        card_center_id: newVal.formValue.card_center_id,
        fintech: newVal.formValue.fintech,
        disc_rate: newVal.formValue.disc_rate,
        tgl_berlaku: newVal.formValue.tgl_berlaku,
        file: newVal.formValue.image,
      };
      isDisableCompany.value = !!newVal.formValue.company_id;
      isDisableBisnisUnit.value = !!newVal.formValue.bisnis_unit_id;
    });

    /* watch(props, (newVal) => {
      (newVal) => {
        fetchBinTech(newVal.formValue.card_center_id);
        if (!qrisPaymentId.value) {
          formData.value.bin_id = "";
        }
      },
      { deep: true }
    }); */

    watch(
      () => formData.value.fintech,
      (newVal) => {
        fetchBinTech(newVal);
        if (!qrisPaymentId.value) {
          formData.value.bin_id = "";
        }
      },
      { deep: true }
    );

    watch(
      () => formData.value.card_center_id,
      (newVal) => {
        fetchBin(newVal);
        if (!qrisPaymentId.value) {
          formData.value.bin_id = "";
        }
      },
      { deep: true }
    );

    return {
      businessUnite,
      bank,
      fintech,
      uploadImage,
      bin,
      discRate,
      tglBerlaku,
      option,
      formData,
      rules,
      qrisPaymentId,
      isLoading,
      isDisableCompany,
      isDisableBisnisUnit,
      onHandelImage,
      onSubmit,
      formRef,
      Copy,
      saveTable,
      delImage,
      mapData,
      changeFieldNumber,
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
</style>
