<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-250px fs-6"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <div class="menu-content text-muted pb-2 px-5 fs-7 text-uppercase">
        Menu
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">

      <a href="#kt_company_export_modal" data-bs-toggle="modal" data-bs-target="#kt_company_export_modal" class="menu-link flex-stack px-5"> Export

        <i
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="tooltip"
        title="Export Data"
      ></i>
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a href="#kt_modal_add_company" data-bs-toggle="modal" data-bs-target="#kt_modal_add_company" class="menu-link flex-stack px-5">
        Create

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="tooltip"
          title="Create Data"
        ></i>
      </a>
    </div>
    <!--end::Menu item-->


  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "dropdown-3",
  components: {},
});
</script>
