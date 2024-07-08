<template>
  <div
    class="modal fade"
    id="kt_modal_add_houser"
    ref="addHouserModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_houser_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add HO User</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_houser_close"
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
              id="kt_modal_add_houser_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_houser_header"
              data-kt-scroll-wrappers="#kt_modal_add_houser_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12 mb-4">Detail User</div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Nama User HO</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
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
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2">NIK</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="nik">
                      <el-input
                        v-model="formData.nik"
                        type="number"
                        onkeyup="this.value = this.value.toUpperCase();"
                        @click="Copy($event.srcElement.value)"
                      />
                      <span class="errMessageCustom">{{
                        errorMessage["nik"]
                      }}</span>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2">Email</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="email">
                      <el-input
                        v-model="formData.email"
                        type="email"
                        @click="Copy($event.srcElement.value)"
                      />
                      <span class="errMessageCustom">{{
                        errorMessage["email"]
                      }}</span>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-12 mb-4">Detail Akun</div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <label class="required fs-6 fw-semobold mb-2"
                      >Password</label
                    >
                    <el-form-item prop="password">
                      <el-input
                        v-model="formData.password"
                        type="password"
                        @keyup="checkPassword()"
                        @click="Copy($event.srcElement.value)"
                      />
                      <span
                        style="color: red; font-size: 10px"
                        v-if="formData.spanPassword != ''"
                        >{{ formData.spanPassword }}</span
                      >
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
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
                        style="color: red; font-size: 10px"
                        v-if="formData.password != formData.konfirmasiPassword"
                        >Password doesn't match</span
                      >
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>

                <div class="col-4">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Status</label>
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
                      v-model="formData.faktif"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.faktif ? "Active" : "Inactive" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
                <hr />
              </div>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Company</th>
                      <th>Bisnis Unit</th>
                      <th>Divisi</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, index) in formData.pushDivisi"
                      :key="index"
                    >
                      <td v-if="row.id != ''">{{ row.company }}</td>
                      <td v-if="row.id != ''">{{ row.bunit }}</td>
                      <td v-if="row.id != ''">{{ row.divisi }}</td>
                      <td v-if="row.id != ''">{{ row.role }}</td>
                      <td v-if="row.id != ''">
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="delMapDivisi(row.id)"
                        >
                          <i class="fa fa-trash" style="color: red"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-12 mb-4">
                  <label>Detail Role</label>
                </div>
                <div class="col-5">
                  <div class="fv-row">
                    <label class="required fs-6 fw-semobold mb-2">Divisi</label>
                    <Multiselect
                      v-model="formData.divisi"
                      :searchable="true"
                      :options="formData.optionsDivisi"
                      @change="changeRole($event)"
                      placeholder="Select"
                      @click="CopyEvent(formData.divisi, 'divisi')"
                    ></Multiselect>
                    <span v-if="formData.errDivisi" style="color: red"
                      >Divisi is required</span
                    >
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2">Role</label>
                    <Multiselect
                      v-model="formData.role"
                      :searchable="true"
                      :options="formData.optionsRole"
                      placeholder="Select"
                      @click="CopyEvent(formData.role, 'role')"
                    ></Multiselect>
                    <span v-if="formData.errRole" style="color: red"
                      >Role is required</span
                    >
                  </div>
                </div>
                <div class="col-3">
                  <div class="fv-row mt-8">
                    <button
                      type="button"
                      class="btn btn-outline btn-outline btn-outline-danger btn-active-light-danger btn-sm"
                      @click="pushDivisiClick()"
                    >
                      + Divisi & Role
                    </button>
                  </div>
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
  name: "add-houser-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addHouserModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      nik: "",
      username: "",
      divisi: "",
      role: "",
      buintCode: [],
      optionsDivisi: [],
      email: "",
      konfirmasiPassword: "",
      password: "",
      faktif: true,
      companyId: <any>[],
      pushDivisi: <any>[],
      optionsRole: [],
      roleId: [],
      spanPassword: "",
      errDivisi: false,
      errRole: false,
    });

    const divisiAll = ref([]);
    const roleAll = ref([]);

    const rules = ref({
      nik: [
        {
          required: true,
          message: "Nik is required",
          trigger: "change",
        },
      ],
      username: [
        {
          required: true,
          message: "Username is required",
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
          message: "Confirm Password is required",
          trigger: "change",
        },
      ],
    });

    onMounted(() => {
      getList();
    });

    const getList = async () => {
      let divisiList: any = [];
      let roleList: any = [];
      await ApiService.get("divisi").then((data) => {
        data.data.data.forEach((el) => {
          divisiList.push({
            value: el.divisi_id,
            label: el.divisi_name,
          });
        });
        divisiAll.value = data.data.data;
      });
      await ApiService.get("role").then((data) => {
        data.data.data.forEach((el) => {
          roleList.push({
            value: el.role_id,
            label: el.role_name,
          });
        });
        roleAll.value = data.data.data;
      });
      formData.value.optionsRole = roleList;
      formData.value.optionsDivisi = divisiList;
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

      if (formData.value.pushDivisi.length < 1) {
        formData.value.errDivisi = true;
        formData.value.errRole = true;
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          let divisiId: any = [];
          formData.value.pushDivisi.forEach((val) => {
            if (val.id != "") {
              divisiId.push({
                divisi_id: val.id,
              });
            }
          });

          let roleId: any = [];
          formData.value.roleId.forEach((val) => {
            roleId.push({
              role_id: val,
            });
          });

          let bisnisId: any = [];
          formData.value.buintCode.forEach((val) => {
            bisnisId.push({
              bisnis_unit_id: val,
            });
          });

          let companyId: any = [];
          formData.value.companyId.forEach((val) => {
            companyId.push({
              company_id: val,
            });
          });
          const saveData = {
            divisi: divisiId,
            role: roleId,
            bisnis_unit: bisnisId,
            company: companyId,
            email: formData.value.email,
            password: formData.value.password,
            nik: formData.value.nik.toUpperCase(),
            name: formData.value.username.toUpperCase(),
            status: formData.value.faktif == true ? "Active" : "Inactive",
          };

          ApiService.post("user/ho", saveData)
            .then((data) => {
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
                  hideModal(addHouserModalRef.value);
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
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    };

    const pushDivisiClick = () => {
      if (formData.value.divisi == "") {
        formData.value.errDivisi = true;
        return;
      }

      if (formData.value.role == "") {
        formData.value.errRole = true;
        return;
      }
      let roleName: string = "";
      let roleId: any = [];
      roleAll.value.forEach((val: any) => {
        if (formData.value.role == val.role_id) {
          roleName = val.role_name;
          roleId.push(val.role_id);
          return;
        }
      });

      let bunit: any = [];
      let bunitcode: any = [];
      let company: any = [];
      let companyId: any = [];
      divisiAll.value.forEach((val: any) => {
        if (formData.value.divisi == val.divisi_id) {
          val.divisi_bisnis_unit.forEach((el) => {
            bunit.push(el.bisnis_unit.bisnis_unit);
            bunitcode.push(el.bisnis_unit.bisnis_unit_id);
          });

          val.divisi_company.forEach((el) => {
            company.push(el.company.company_name);
            companyId.push(el.company.company_id);
          });

          formData.value.pushDivisi.push({
            id: val.divisi_id,
            company: company.toString(),
            bunit: bunit.toString(),
            divisi: val.divisi_name,
            role: roleName,
          });
          formData.value.divisi = "";
          formData.value.role = "";
          return;
        }
      });

      formData.value.buintCode = bunitcode;
      formData.value.companyId = companyId;
      formData.value.roleId = roleId;
    };

    const delMapDivisi = (key) => {
      var index = formData.value.pushDivisi
        .map((x) => {
          return x.id;
        })
        .indexOf(key);

      formData.value.pushDivisi.splice(index, 1);
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

    const changeRole = async (id) => {
      if (id == undefined || id == null) {
        return;
      }
      let roleList: any = [];
      await ApiService.get(`role?divisi_id=[${id}]`).then((data) => {
        data.data.data.forEach((el) => {
          roleList.push({
            value: el.role_id,
            label: el.role_name,
          });
        });
        roleAll.value = data.data.data;
      });
      formData.value.optionsRole = roleList;
    };

    const CopyEvent = (id, act) => {
      if (act == "divisi") {
        formData.value.optionsDivisi.forEach((val: any) => {
          if (id == val.value) {
            Copy(val.label);
          }
        });
      } else {
        formData.value.optionsRole.forEach((val: any) => {
          if (id == val.value) {
            Copy(val.label);
          }
        });
      }
    };

    const resetForm = () => {
      formData.value = {
        nik: "",
        username: "",
        divisi: "",
        role: {},
        buintCode: [],
        optionsDivisi: [],
        email: "",
        konfirmasiPassword: "",
        password: "",
        faktif: true,
        companyId: "",
        pushDivisi: [
          {
            id: "",
            company: "",
            bunit: "",
            divisi: "",
            role: "",
          },
        ],
        optionsRole: [],
        roleId: [],
        spanPassword: "",
      };
      formRef?.value?.resetFields();
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addHouserModalRef,
      getAssetPath,
      countries,
      Multiselect,
      pushDivisiClick,
      delMapDivisi,
      checkPassword,
      changeRole,
      Copy,
      CopyEvent,
      resetForm,
      errorMessage,
    };
  },
});
</script>
