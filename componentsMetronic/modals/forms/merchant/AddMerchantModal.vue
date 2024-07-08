<template>
  <div
    class="modal fade"
    id="kt_modal_add_merchant"
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
        <div class="modal-header" id="kt_modal_add_merchant_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Master Merchant</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_merchant_close"
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
              id="kt_modal_add_merchant_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_merchant_header"
              data-kt-scroll-wrappers="#kt_modal_add_merchant_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Merchant</label
                  >

                  <el-form-item prop="merch_code">
                    <el-input
                      v-model="formData.merch_code"
                      type="text"
                      placeholder=""
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nama Merchant</label
                  >

                  <el-form-item prop="merch_name">
                    <el-input
                      v-model="formData.merch_name"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <!--end::Col-->
              </div>
              <br />
              <div class="row">
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">F ECR</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid mt-2"
                  >
                    <input
                      v-model="formData.ecr"
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexSwitchChecked"
                      :checked="formData.ecr"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.ecr ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Share EDC</label
                  >
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    class="form-check form-switch form-check-custom form-check-solid mt-2"
                  >
                    <input
                      v-model="formData.share"
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchChecked"
                      :checked="formData.share"
                      @click="handleShareEDC($event)"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.share ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--begin::Input group-->
                <div class="col-md-4 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Status</label>
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
                      v-model="formData.status"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.status ? "Active" : "Inactive" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
              </div>
              <br />
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-12 fv-row">
                  <label
                    :class="`${
                      formData.share ? 'required' : ''
                    } fs-6 fw-semobold mb-2`"
                    >Mesin EDC Share</label
                  >

                  <el-form-item prop="company">
                    <Multiselect
                      :disabled="formData.share ? false : true"
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      @select="
                        (id, _) => {
                          formData.company = id;
                        }
                      "
                      @click="
                        () => {
                          formData.optionsCompany.forEach((val) => {
                            if (formData.company == val.value) {
                              Copy(val.label);
                            }
                          });
                        }
                      "
                    ></Multiselect>
                  </el-form-item>
                </div>
                <!--end::Col-->
              </div>
              <div class="row">
                <div class="col-md-12 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Logo Merchant</label
                  >
                  <el-form-item
                    prop="file"
                    style="padding-left: 2px !important"
                  >
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
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-merchant-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const inputFile = ref(true);
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      company: "",
      merchant_id: "",
      merch_code: "",
      merch_name: "",
      ecr: false,
      share: false,
      status: true,
      merchant_share_edc: "",
      company_id: "",
      edc_id: "",
      optionsCompany: <any>[],
      imagepath: <any>new Blob(),
      image: null,
    });

    onMounted(async () => {
      let companyList: any = [];
      await ApiService.get("share-edc?search[status]=Active")
        .then((data) => {
          data.data.data.forEach((val) => {
            companyList.push({
              value: val.edc_id,
              label: val.nama_mesin,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      formData.value.optionsCompany = companyList;
    });

    const rules = ref({
      merch_code: [
        {
          required: true,
          message: "Merchant Code is required",
          trigger: "change",
        },
      ],
      merch_name: [
        {
          required: true,
          message: "Merchant Name is required",
          trigger: "change",
        },
      ],
      imagepath: [
        {
          required: true,
          message: "Image is required",
          trigger: "change",
        },
      ],
      status: [
        {
          required: true,
          message: "Status is required",
          trigger: "change",
        },
      ],
      ecr: [
        {
          required: true,
          message: "Status is required",
          trigger: "change",
        },
      ],
      share: [
        {
          required: true,
          message: "Status is required",
          trigger: "change",
        },
      ],
      company: [
        {
          required: false,
          message: "Mesin EDC Share is required",
          trigger: "change",
        },
      ],
    });

    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const resetForm = async () => {
      formData.value = {
        ...formData.value,
        company: "",
        merchant_id: "",
        merch_code: "",
        merch_name: "",
        ecr: true,
        share: true,
        status: true,
        merchant_share_edc: "",
        company_id: "",
        edc_id: "",
        imagepath: new Blob(),
        image: null,
      };
      // Reset field by rerender field
      formData.value.image = null;
      inputFile.value = false;
      await nextTick();
      inputFile.value = true;
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

      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (!formData.value.image) {
          errMessage.value["image"] = "Upload image is required";
        }
        if (valid && formData.value.image) {
          loading.value = true;

          let file = new FormData();

          file.append("image", formData.value.image);
          //file.append("image", formData.value.imagepath);
          file.append("merch_code", formData.value.merch_code.toUpperCase());
          file.append("merch_name", formData.value.merch_name.toUpperCase());
          file.append("ecr", formData.value.ecr ? "YES" : "NO");
          file.append("share", formData.value.share ? "YES" : "NO");
          file.append("status", formData.value.status ? "Active" : "Inactive");
          file.append("edc_id", formData.value.company);

          await ApiService.post("merchant", file).then((data) => {
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

    const handleShareEDC = (e) => {
      const { checked } = e.target;

      formData.value.share = checked;
      rules.value.company[0].required = checked;
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addFormModalRef,
      getAssetPath,
      countries,
      Multiselect,
      saveImage,
      resetForm,
      Copy,
      handleShareEDC,
      errMessage,
      inputFile,
    };
  },
});
</script>
