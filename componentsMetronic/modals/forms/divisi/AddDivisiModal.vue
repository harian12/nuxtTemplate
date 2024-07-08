<template>
  <div
    class="modal fade"
    id="kt_modal_add_divisi"
    ref="addDivisiModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_divisi_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Divisi</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_divisi_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="
              () => {
                formRef?.resetFields();
                errorMessage;
              }
            "
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
              id="kt_modal_add_divisi_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_divisi_header"
              data-kt-scroll-wrappers="#kt_modal_add_divisi_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Divisi</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.name"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                  <span class="errMessageCustom">{{
                    errorMessage["divisi_name"]
                  }}</span>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">
                  <span class="required">Company</span>
                </label>
                <!--end::Label-->

                <el-form-item prop="company">
                  <Multiselect
                    v-model="formData.company"
                    mode="tags"
                    :searchable="true"
                    :groups="true"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    @click="CopyEvent(formData.company)"
                    @change="
                      ($event) => {
                        formData.company = $event;
                        getBisnisUnitOptions();
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Bisnis Unit</label
                >
                <!--end::Label-->

                <el-form-item prop="buinit">
                  <Multiselect
                    v-model="formData.buinit"
                    mode="tags"
                    :searchable="true"
                    :groups="true"
                    :options="formData.optionsBuinit"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                </el-form-item>
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
import { defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-divisi-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addDivisiModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      name: "",
      company: [],
      buinit: [],
      optionsBuinit: [],
      optionsCompany: [],
    });

    const rules = ref({
      name: [
        {
          required: true,
          message: "Divisi is required",
          trigger: "change",
        },
      ],
      company: [
        {
          required: true,
          message: "Company is required",
          trigger: "change",
        },
      ],
      buinit: [
        {
          required: true,
          message: "Bisnis Unit is required",
          trigger: "change",
        },
      ],
    });

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
      let mapPushCom: any = [
        {
          label: "Select All",
          options: companyList,
        },
      ];
      formData.value.optionsCompany = mapPushCom;
    });

    const getBisnisUnitOptions = async () => {
      const companyId = formData.value.company.join(", ");

      let buinitList: any = [];
      await ApiService.get(`bisnis-unit?company_id=[${companyId}]`)
        .then((data) => {
          data.data.data.forEach((val) => {
            buinitList.push({
              value: val.bisnis_unit_id,
              label: val.bisnis_unit_code + "-" + val.bisnis_unit,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      let mapPush: any = [
        {
          label: "Select All",
          options: buinitList,
        },
      ];
      formData.value.optionsBuinit = mapPush;
      formData.value.buinit = [];
    };

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

          let bunitId: any = [];
          formData.value.buinit.forEach((val: any) => {
            bunitId.push({
              bisnis_unit_id: val,
            });
          });

          let companyId: any = [];
          formData.value.company.forEach((val: any) => {
            companyId.push({
              company_id: val,
            });
          });
          let saveData = {
            divisi_name: formData.value.name.toUpperCase(),
            divisi_company: companyId,
            divisi_bisnis_unit: bunitId,
          };

          await ApiService.post("divisi", saveData).then((data) => {
            loading.value = false;
            if (data.data.status_code == 200) {
              Swal.fire({
                text: "Form has been successfully submitted!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              }).then(() => {
                hideModal(addDivisiModalRef.value);
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
                  confirmButton: "btn btn-danger",
                },
              });
              loading.value = false;
              return false;
            }
          });
        }
      });
    };

    const CopyEvent = (id) => {
      formData.value.optionsCompany.forEach((val: any) => {
        if (id == val.value) {
          Copy(val.label);
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addDivisiModalRef,
      getAssetPath,
      countries,
      Multiselect,
      CopyEvent,
      Copy,
      getBisnisUnitOptions,
      errorMessage,
    };
  },
});
</script>
