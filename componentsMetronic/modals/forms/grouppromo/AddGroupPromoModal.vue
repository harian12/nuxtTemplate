<template>
  <div
    class="modal fade"
    id="kt_modal_add_grouppromo"
    ref="addBufferAtkModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_grouppromo_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Group Info Promo</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_grouppromo_close"
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
              id="kt_modal_add_grouppromo_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_grouppromo_header"
              data-kt-scroll-wrappers="#kt_modal_add_grouppromo_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12 mb-4">Detail Group Promo</div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Company</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="company">
                      <Multiselect
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
                            formData.optionsBisnis.forEach((element) => {
                              if (formData.bisnis == element.value) {
                                Copy(element.label);
                              }
                            });
                          }
                        "
                        @change="
                          ($event) => {
                            changeOptions($event);
                          }
                        "
                      ></Multiselect>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Bisnis Unit</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="bisnis">
                      <Multiselect
                        v-model="formData.bisnis"
                        :searchable="true"
                        :options="formData.optionsBisnis"
                        placeholder="Select"
                        @select="
                          (id, val) => {
                            changeCabangList(val.label);

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
                      ></Multiselect>
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row mb-7">
                    <!--begin::Label-->
                    <label class="required fs-6 fw-semobold mb-2"
                      >Kode Group</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="group_cabang_promo_code">
                      <el-input
                        v-model="formData.group_cabang_promo_code"
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
                    <label class="fs-6 fw-semobold mb-2"
                      >Deskripsi Group Promo</label
                    >
                    <!--end::Label-->

                    <!--begin::Input-->
                    <el-form-item prop="group_desc">
                      <el-input
                        v-model="formData.group_desc"
                        type="text"
                        onkeyup="this.value = this.value.toUpperCase();"
                        @click="Copy($event.srcElement.value)"
                      />
                    </el-form-item>
                    <!--end::Input-->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <!--begin::Input group-->
                  <div class="fv-row mb-7">
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
                        v-model="formData.faktif"
                      />
                      <label class="form-check-label" for="flexSwitchChecked">
                        {{ formData.faktif ? "Active" : "Inactive" }}
                      </label>
                    </div>
                    <!--end::Input-->
                  </div>
                </div>
                <div class="col-4">
                  <div class="fv-row">
                    <label class="fs-6 fw-semobold mb-2 required">Cabang</label>
                    <Multiselect
                      v-model="formData.divisi"
                      :searchable="true"
                      :clear-on-select="true"
                      :options="formData.optionsDivisi"
                      placeholder="Select"
                      @select="
                        (id, _) => {
                          formData.divisi = id;
                        }
                      "
                      @click="
                        () => {
                          formData.optionsDivisi.forEach((element) => {
                            if (formData.divisi == element.value) {
                              Copy(element.label);
                            }
                          });
                        }
                      "
                    ></Multiselect>
                    <span
                      v-if="formData.cabangErr"
                      style="color: red; font-size: 11px"
                      >Cabang sudah tersedia</span
                    >
                    <span
                      v-if="formData.cabangEmpty"
                      style="color: red; font-size: 11px"
                      >Cabang tidak boleh kosong</span
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
                      + data
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <hr />
                <div class="col-1 mt-2">
                  <label for="">Search</label>
                </div>
                <div class="col-4">
                  <el-form-item>
                    <el-input
                      v-model="formData.searchCabang"
                      type="text"
                      ref="cabang"
                      @keyup="changeCabang()"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Kode Plant</th>
                      <th>Nama Plant</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, index) in formData.pushDivisi"
                      :key="index"
                    >
                      <td v-if="row.id != ''">{{ row.plant_code }}</td>
                      <td v-if="row.id != ''">{{ row.plant_name }}</td>
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
  name: "add-bufferatk-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addBufferAtkModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      group_cabang_promo_id: "",
      group_cabang_promo_code: "",
      group_desc: "",
      status: "",
      group_cabang_id: "",
      group_cabang: "",
      cabang_id: "",
      cabang: "",
      divisi: "",
      role: {},
      buintCode: [],
      optionsDivisi: <any>[],
      optionsBisnis: <any>[],
      bisnis: "",
      email: "",
      konfirmasiPassword: "",
      password: "",
      faktif: true,
      companyId: "",
      pushDivisi: <any>[],
      optionsRole: {},
      roleId: [],
      spanPassword: "",
      searchCabang: "",
      pushDivisiOld: <any>[],
      cabangErr: false,
      company: "",
      optionsCompany: <any>[],
      cabangEmpty: false,
    });

    const divisiAll = ref([]);
    const bisnisAll = ref([]);
    const roleAll = ref([]);

    const rules = ref({
      group_cabang_promo_code: [
        {
          required: true,
          message: "Group Cabang Promo Code is required",
          trigger: "change",
        },
      ],
      bisnis: [
        {
          required: true,
          message: "Bisnis Unit is required",
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
    });

    onMounted(() => {
      getList();
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        pushDivisi: [
          {
            id: "",
            plant_code: "",
            plant_name: "",
          },
        ],
        group_cabang_promo_code: "",
        group_desc: "",
        bisnis: "",
        cabangErr: false,
        cabangEmpty: false,
      };
      formRef?.value?.resetFields();
    };

    const getList = async () => {
      let roleList: any = [];
      await ApiService.get("cabang").then((data) => {
        divisiAll.value = data.data.data;
      });
      await ApiService.get("plant").then((data) => {
        data.data.data.forEach((el) => {
          roleList.push({
            value: el.id,
            label: el.plant_name,
          });
        });
        roleAll.value = data.data.data;
      });

      let listcode: any = [];
      await ApiService.get("company").then((data) => {
        data.data.data.forEach((el) => {
          if (el.company_name != "") {
            listcode.push({
              value: el.company_id,
              label: `${el.company_code} - ${el.company_name}`,
            });
          }
        });
      });
      formData.value.optionsRole = roleList;
      formData.value.optionsCompany = listcode;
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

      if (formData.value.pushDivisi.length < 1) {
        formData.value.cabangEmpty = true;
      }
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (formData.value.pushDivisi.length < 1) {
          formData.value.cabangEmpty = true;
          return;
        }
        if (valid) {
          loading.value = true;

          let divisiId: any = [];
          formData.value.pushDivisi.forEach((val) => {
            if (val.id != "") {
              divisiId.push({
                cabang_id: val.id,
              });
            }
          });

          const saveData = {
            cabang: divisiId,
            group_cabang_promo_code:
              formData.value.group_cabang_promo_code.toUpperCase(),
            group_desc: formData.value.group_desc.toUpperCase(),
            bisnis_unit_id: formData.value.bisnis,
            status: formData.value.faktif ? "Active" : "Inactive",
            company_id: formData.value.company,
          };

          ApiService.post("group-cabang-promo", saveData)
            .then((data) => {
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
                  hideModal(addBufferAtkModalRef.value);
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
        return;
      }

      let addField = true;
      formData.value.pushDivisi.forEach((val: any) => {
        if (formData.value.divisi == val.id) {
          addField = false;
          formData.value.cabangErr = true;
          return;
        }
      });

      if (addField) {
        divisiAll.value.forEach((val: any) => {
          if (formData.value.divisi == val.cabang_id) {
            formData.value.pushDivisi.push({
              id: val.cabang_id,
              plant_code: val.plant.plant_code,
              plant_name: val.plant.plant_name,
            });
            formData.value.divisi = "";
            formData.value.role = "";
            return;
          }
        });
      }
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
        formData.value.spanPassword =
          "Minimum eight characters, at least one uppercase letter, one lowercase letter and one numbe";
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

    const changeCabang = () => {
      const text = formData.value.searchCabang;
      let dataFilter = formData.value.pushDivisi;
      if (formData.value.pushDivisiOld.length == 0) {
        formData.value.pushDivisiOld = formData.value.pushDivisi;
      } else {
        dataFilter = formData.value.pushDivisiOld;
      }

      if (text != "") {
        const filteredList = dataFilter
          .filter(
            (e) =>
              e.plant_code.toUpperCase().includes(text.toUpperCase()) ||
              e.plant_name.toUpperCase().includes(text.toUpperCase())
          )
          .map((e) => {
            return {
              id: e.id,
              plant_code: e.plant_code,
              plant_name: e.plant_name,
            };
          });
        formData.value.pushDivisi = filteredList;
      } else {
        formData.value.pushDivisi = dataFilter;
      }
    };

    const changeOptions = async (data) => {
      let biunit: any = [];
      await ApiService.get(`bisnis-unit?company_id=[${data}]`).then((data) => {
        data.data.data.forEach((el) => {
          biunit.push({
            value: el.bisnis_unit_id,
            label: el.bisnis_unit,
          });
        });
      });

      formData.value.optionsBisnis = biunit;
    };

    const changeCabangList = async (data) => {
      formData.value.divisi = "";
      let divisiList: any = [];
      await ApiService.get(`cabang?bisnis_unit=${data}`).then((data) => {
        data.data.data.forEach((el) => {
          divisiList.push({
            value: el.cabang_id,
            label: `${el.plant.plant_code} - ${el.plant.plant_name}`,
          });
        });
      });
      formData.value.optionsDivisi = divisiList;
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addBufferAtkModalRef,
      getAssetPath,
      countries,
      Multiselect,
      pushDivisiClick,
      delMapDivisi,
      checkPassword,
      changeRole,
      resetForm,
      Copy,
      changeCabang,
      changeOptions,
      changeCabangList,
    };
  },
});
</script>
