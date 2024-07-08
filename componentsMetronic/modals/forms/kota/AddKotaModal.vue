<template>
  <div
    class="modal fade"
    id="kt_modal_add_kota"
    ref="addKotaModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_kota_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Kota</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_kota_close"
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
              id="kt_modal_add_kota_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_kota_header"
              data-kt-scroll-wrappers="#kt_modal_add_kota_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Provinsi</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="kodepropinsi">
                    <Multiselect
                      v-model="formData.kodepropinsi"
                      :options="formData.optionsPropinsi"
                      :searchable="true"
                      placeholder="select"
                      @select="
                        (id, _) => {
                          formData.kodepropinsi = id;
                        }
                      "
                      @click="
                        () => {
                          formData.optionsPropinsi.forEach((element) => {
                            if (formData.kodepropinsi == element.value) {
                              Copy(element.label);
                            }
                          });
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Pulau</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="kodepulau">
                    <Multiselect
                      v-model="formData.kodepulau"
                      :searchable="true"
                      :options="formData.optionsPulau"
                      placeholder="Select"
                      @select="
                        (id, _) => {
                          formData.kodepulau = id;
                        }
                      "
                      @click="
                        () => {
                          formData.optionsPulau.forEach((element) => {
                            if (formData.kodepulau == element.value) {
                              Copy(element.label);
                            }
                          });
                        }
                      "
                    ></Multiselect>
                    <!--end::Input-->
                  </el-form-item>
                </div>
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Kota</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="kode">
                    <el-input
                      v-model="formData.kode"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                    <span class="errMessageCustom">{{
                      errorMessage["kota_id"]
                    }}</span>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nama Kota</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="nama">
                    <el-input
                      v-model="formData.nama"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Longitude</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.lon"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-6">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Latitude</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item>
                    <el-input
                      v-model="formData.lat"
                      type="text"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
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
import { defineComponent, ref, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-kota-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addKotaModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      lat: "",
      lon: "",
      kode: "",
      nama: "",
      kodepulau: null,
      optionsPulau: <any>[],
      kodepropinsi: null,
      optionsPropinsi: <any>[],
    });

    const example1 = ref({
      kodepulau: null,
      options: {},
    });

    const example2 = ref({
      kodepropinsi: null,
      options: {},
    });

    const rules = ref({
      kodepulau: [
        {
          required: true,
          message: "Kode Pulau is required",
          trigger: "change",
        },
      ],
      kodepropinsi: [
        {
          required: true,
          message: "Kode Provinsi is required",
          trigger: "change",
        },
      ],
      lon: [
        {
          required: true,
          message: "longitude is required",
          trigger: "change",
        },
      ],
      lat: [
        {
          required: true,
          message: "latitude is required",
          trigger: "change",
        },
      ],
      kode: [
        {
          required: true,
          message: "Kode Kota is required",
          trigger: "change",
        },
      ],
      nama: [
        {
          required: true,
          message: "Nama Kota is required",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      let pulau = await ApiService.get("pulau");
      let province = await ApiService.get("propinsi");
      let pulauList: any = [];
      pulau.data.data.forEach((val) => {
        pulauList.push({
          value: val.pulau,
          label: val.pulau,
        });
      });

      let provinceList: any = [];
      province.data.data.forEach((val) => {
        provinceList.push({
          value: val.prop_id,
          label: val.prop_name,
        });
      });
      formData.value.optionsPulau = pulauList;
      formData.value.optionsPropinsi = provinceList;
    });

    const errorMessage = ref<any>([]);
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
            kota_id: formData.value.kode.toUpperCase(),
            kota: formData.value.nama.toUpperCase(),
            latitude: formData.value.lat,
            longitude: formData.value.lon,
            propinsi: formData.value.kodepropinsi,
            pulau: formData.value.kodepulau,
          };

          await ApiService.post("kota", saveData).then((data) => {
            loading.value = false;
            if (data.data.status_code == 200) {
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
                hideModal(addKotaModalRef.value);
                emit("reload");
              });
            } else if (data.data.status_code == 400) {
              data.data.errors.forEach((val) => {
                errorMessage.value[val.path] = val.msg;
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
              loading.value = false;
            }
          });
        }
      });
    };

    const resetForm = () => {
      formRef?.value?.resetFields();
      errorMessage.value = [];
    };

    return {
      formData,
      example1,
      example2,
      rules,
      submit,
      formRef,
      loading,
      addKotaModalRef,
      getAssetPath,
      countries,
      Multiselect,
      Copy,
      resetForm,
      errorMessage,
    };
  },
});
</script>
