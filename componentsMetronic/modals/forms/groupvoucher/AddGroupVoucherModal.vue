<template>
  <div
    class="modal fade"
    id="kt_modal_add_groupvoucher"
    ref="addFormModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_groupvoucher_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Group Voucher</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_groupvoucher_close"
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
              id="kt_modal_add_groupvoucher_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_groupvoucher_header"
              data-kt-scroll-wrappers="#kt_modal_add_groupvoucher_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Company</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="company">
                  <Multiselect
                    v-model="formData.company"
                    :searchable="true"
                    :close-on-select="false"
                    :groups="true"
                    mode="tags"
                    :options="formData.optionsCompany"
                    placeholder="Select"
                    @click="Copy($event.srcElement.innerText)"
                  ></Multiselect>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Kode Group Voucher</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="voucher_group_code">
                  <el-input
                    v-model="formData.voucher_group_code"
                    type="text"
                    placeholder=""
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                  <span class="errMessageCustom">{{
                    errorMessage["company"]
                  }}</span>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Nama Group Voucher</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="voucher_group_name">
                  <el-input
                    v-model="formData.voucher_group_name"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">F Jual</label>
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
                    v-model="formData.sell_flag"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ formData.sell_flag ? "YES" : "NO" }}
                  </label>
                </div>
                <!--end::Input-->
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
import { defineComponent, onMounted, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import { company } from "../../../../stores/company";
import { validate } from "@/core/helpers/validation";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-groupvoucher-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const formData: any = ref({
      company: [],
      voucher_group_name: "",
      voucher_group_code: "",
      sell_flag: true,
      company_id: "",
      optionsCompany: {
        label: "Select All",
        options: [],
      },
    });

    watch(
      () => company.list,
      (list) => {
        formData.value.company = list;
      }
    );

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
      formData.value.optionsCompany.options = companyList;
    });

    const rules = ref({
      company: [
        {
          required: true,
          message: "Kode Company is required",
          trigger: "change",
        },
      ],
      voucher_group_name: [
        {
          required: true,
          message: "Kode Group Voucher is required",
          trigger: "change",
        },
      ],
      voucher_group_code: [
        {
          required: true,
          message: "Nama Group Voucher is required",
          trigger: "change",
        },
      ],
      sell_flag: [
        {
          required: true,
          message: "Sell Flag is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        company: [],
        voucher_group_name: "",
        voucher_group_code: "",
        sell_flag: true,
      };
      formRef?.value?.resetFields();
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

      loading.value = true;
      if (!formRef.value) {
        loading.value = false;
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        const invalid = await validate(rules, formData);

        if (valid && invalid.length <= 0 && formData.value.company.length > 0) {
          let companyId: any = [];
          formData.value.company.forEach((data) => {
            companyId.push({
              company_id: data,
            });
          });
          const saveData = {
            voucher_group_name: formData.value.voucher_group_name.toUpperCase(),
            voucher_group_code: formData.value.voucher_group_code.toUpperCase(),
            sell_flag: formData.value.sell_flag == true ? "Y" : "N",
            company: companyId,
          };

          await ApiService.post("voucher-group", saveData).then((data) => {
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
                hideModal(addFormModalRef.value);
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
              }).then(() => {
                loading.value = false;
              });
            }
          });
        }
      });
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
      resetForm,
      Copy,
      errorMessage,
    };
  },
});
</script>
