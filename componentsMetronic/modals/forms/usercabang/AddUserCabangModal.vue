<template>
  <div
    class="modal fade"
    id="kt_modal_add"
    ref="addModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Pos User</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_close"
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
              id="kt_modal_add_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_header"
              data-kt-scroll-wrappers="#kt_modal_add_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Role</label>
                  <!--end::Label-->
                  <el-form-item prop="role">
                    <Multiselect
                      v-model="formData.role"
                      :searchable="true"
                      :options="formData.optionsRole"
                      @click="CopyEvent(formData.role, 'role')"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nama User POS</label
                  >
                  <el-form-item prop="username">
                    <el-input
                      v-model="formData.username"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Company</label>
                  <!--end::Label-->
                  <el-form-item prop="company">
                    <Multiselect
                      v-model="formData.company"
                      :searchable="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      @click="CopyEvent(formData.company, 'company')"
                      @change="getBisnisUnitOptions($event)"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Cabang</label>
                  <!--end::Label-->
                  <el-form-item prop="cabang">
                    <Multiselect
                      v-model="formData.cabang"
                      :searchable="true"
                      :options="formData.optionsCabang"
                      @click="CopyEvent(formData.cabang, 'cabang')"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">NIK</label>
                  <el-form-item prop="nik">
                    <el-input
                      v-model="formData.nik"
                      type="number"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Bisnis Unit</label
                  >
                  <el-form-item prop="buinit">
                    <Multiselect
                      v-model="formData.buinit"
                      :searchable="true"
                      mode="tags"
                      :options="formData.optionsBuinit"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                      style="line-height: 1;"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Email</label>
                  <el-form-item prop="email">
                    <el-input
                      v-model="formData.email"
                      type="email"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Password</label>
                  <el-form-item prop="password">
                    <el-input
                      v-model="formData.password"
                      type="password"
                      @keyup="checkPassword()"
                      @click="Copy($event.srcElement.value)"
                    />
                    <span
                      style="color: red; font-size: 10px;"
                      v-if="formData.spanPassword != ''"
                      >{{ formData.spanPassword }}</span
                    >
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Konfirmasi Password</label
                  >
                  <el-form-item prop="konfirmasiPassword">
                    <el-input
                      v-model="formData.konfirmasiPassword"
                      type="password"
                      @click="Copy($event.srcElement.value)"
                    />
                    <span
                      style="color: red; font-size: 10px;"
                      v-if="formData.password != formData.konfirmasiPassword"
                      >Password doesn't match</span
                    >
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-4 mb-2 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Status</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <div
                    :class="
                      formData.password == formData.konfirmasiPassword
                        ? 'form-check form-switch form-check-custom form-check-solid mt-2'
                        : 'form-check form-switch form-check-custom form-check-solid'
                    "
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexSwitchChecked"
                      v-model="formData.faktif"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.faktif ? "Active" : "Inactive" }}
                    </label>
                  </div>
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
import { defineComponent, ref, onMounted, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-cabang-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    let formData = ref({
      role: "",
      company: "",
      optionsRole: {
        1: "Crew Cabang",
        2: "Kepala Cabang",
      },
      optionsCompany: [],
      cabang: "",
      optionsCabang: [],
      buint: "",
      optionsBuinit: {},
      username: "",
      nik: "",
      email: "",
      password: "",
      konfirmasiPassword: "",
      faktif: true,
      spanPassword: "",
      buinit: [],
    });

    onMounted(async () => {
      let companyList: any = [];
      let cabangList: any = [];
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

      await ApiService.get("cabang")
        .then((data) => {
          data.data.data.forEach((val) => {
            cabangList.push({
              value: val.cabang_id,
              label: `${val.plant.plant_code} - ${val.plant.plant_name}`,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });

      formData.value.optionsCabang = cabangList;
      formData.value.optionsCompany = companyList;
    });

    const getBisnisUnitOptions = async (companyId) => {
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
      formData.value.optionsBuinit = buinitList;
      formData.value.buinit = [];
    };

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        role: "",
        company: "",
        cabang: "",
        buint: "",
        username: "",
        nik: "",
        email: "",
        password: "",
        faktif: true,
        buinit: [],
      };
      formRef?.value?.resetFields();
    };

    const rules = ref({
      company: [
        {
          required: true,
          message: "Company is required",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Name User POS is required",
          trigger: "change",
        },
      ],
      role: [
        {
          required: true,
          message: "role is required",
          trigger: "change",
        },
      ],
      cabang: [
        {
          required: true,
          message: "cabang is required",
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
      nik: [
        {
          required: true,
          message: "Nik is required",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email is required",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: "change",
        },
      ],
      konfirmasiPassword: [
        {
          required: true,
          message: "Konfirmasi Password is required",
          trigger: "change",
        },
      ],
      faktif: [
        {
          required: true,
          message: "Status is required",
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

          let bunitId: any = [];
          formData.value.buinit.forEach((val: any) => {
            bunitId.push({
              bisnis_unit_id: val,
            });
          });

          const saveData = {
            name: formData.value.username.toUpperCase(),
            nik: formData.value.nik,
            password: formData.value.password,
            email: formData.value.email,
            company_id: formData.value.company,
            cabang_id: formData.value.cabang,
            bisnis_unit: bunitId,
            role: formData.value.role,
            status: formData.value.faktif == true ? "Active" : "Inactive",
          };

          await ApiService.post("user/cabang", saveData).then((data) => {
            if (data.data.status_code == 200) {
              loading.value = false;

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
                hideModal(addModalRef.value);
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
              return false;
            }
          });
        }
      });
    };

    const checkPassword = () => {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/.test(
          formData.value.password
        )
      ) {
        formData.value.spanPassword = "";
      } else {
        if (formData.value.password === "") {
          formData.value.spanPassword = "";
        } else {
          formData.value.spanPassword =
            "Minimum 8 characters, contain number, symbols, uppercase and lowercase letters.";
        }
      }
    };

    const CopyEvent = (data, act) => {
      if (act == "company") {
        formData.value.optionsCompany.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      } else if (act == "role") {
        Copy(formData.value.optionsRole[data]);
      } else if (act == "cabang") {
        formData.value.optionsCabang.forEach((val: any) => {
          if (data == val.value) {
            Copy(val.label);
          }
        });
      }
    };

    watch(
      () => formData.value.company,
      async (newVal) => {
        const cabangList: any = [];
        await ApiService.get(`cabang?company_id=${newVal}`)
          .then((data) => {
            data.data.data.forEach((val) => {
              cabangList.push({
                value: val.cabang_id,
                label: val.plant.plant_name,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
        formData.value.optionsCabang = cabangList;
      },
      { deep: true }
    );

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addModalRef,
      getAssetPath,
      countries,
      Multiselect,
      checkPassword,
      Copy,
      CopyEvent,
      resetForm,
      getBisnisUnitOptions,
    };
  },
});
</script>
