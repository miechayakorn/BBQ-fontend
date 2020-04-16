<template>
  <div>
    5555
    <form id="search">
      Search
      <input name="query" v-model="searchQuery" />
    </form>
    <data-table
      class="table table-hover list-doctor"
      :data="gridData"
      :columns-to-display="gridColumns"
      :filter-key="searchQuery"
      :child-hideable="true"
      :child-init-hide="true"
      :columns-to-not-sort="['action']"
    >
      <template slot="action" scope="props">
        <button
          @click="editBooking(props.entry.booking_id)"
          type="button"
          class="btn"
        >
          <i class="fas fa-pen edit" style="color: #ffc107;"></i>
        </button>
        <button
          @click="deleteBooking(props.entry.booking_id)"
          type="button"
          class="btn"
        >
          <i class="fas fa-trash" style="color: #e34724;"></i>
        </button>
      </template>
    </data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      gridColumns: ["booking_id", "hn_number", "first_name"],
      displayNames: {
        power: "Super Powers"
      },
      gridData: [
        {
          booking_id: 1,
          hn_number: 60130500001,
          first_name: "ทดสอบ",
          last_name: "การทำงาน",
          time_in: "12:00:00",
          type_id: 1,
          date: "27/04/2020"
        },
        {
          booking_id: 2,
          hn_number: 60130500001,
          first_name: "ทดสอบ"
        },
        {
          booking_id: 3,
          hn_number: 601305000013,
          first_name: "ทดสอบ3"
        },
        {
          booking_id: 4,
          hn_number: 60130500001,
          first_name: "ทดสอบ4"
        }
      ]
    };
  }
};
</script>
<style>
.list-doctor > thead {
  background-color: #99a3ff;
  color: #ffffff;
}

.list-doctor > tbody > tr {
  background-color: #ffffff;
}
th.active .arrow.asc {
  border-bottom: 4px solid #4d4d4d;
}

th.active .arrow.dsc {
  border-top: 4px solid #4d4d4d;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #cdc;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #cdc;
}
.previousPage {
  position: relative;
}
.previousPage:before {
  content: "\f104";
  font-family: FontAwesome;
  position: absolute;
}

.nextPage {
  position: relative;
}
.nextPage:before {
  content: "\f105";
  font-family: FontAwesome;
  position: absolute;
  left: 5px;
}
</style>
