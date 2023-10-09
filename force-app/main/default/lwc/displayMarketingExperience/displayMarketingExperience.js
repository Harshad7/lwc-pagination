import { LightningElement, wire, track } from "lwc";
import returnMarketingExperiences from "@salesforce/apex/MarketingExperienceController.returnAllMarketingExperiences";

const columns = [
  {
    label: "Name",
    fieldName: "Name",
    type: "text"
  },
  {
    label: "Type",
    fieldName: "Type__c",
    type: "text"
  },
  {
    label: "Source",
    fieldName: "Source__c"
  },
  {
    label: "Date",
    fieldName: "CreatedDate"
  }
];

export default class DisplayMK extends LightningElement {
  columns = columns;
  recordsPerPage = 10;
  @track data;
  allRecords;
  currentPage;
  maxPages;
  listOfPages = [];

  @wire(returnMarketingExperiences)
  marketingExperience({ error, data }) {
    console.log("Wire Method called");
    if (data) {
      console.log(JSON.stringify(data));
      this.allRecords = data;
      this.displayRecords(data);
      this.maxPages = this.allRecords.length / this.recordsPerPage;
      this.listOfPages = Array.from({ length: this.maxPages }, (_, i) => i + 1);
    } else {
      console.log("Did an error occur?" + JSON.stringify(error));
    }
  }

  handlePageButtonClick(event) {
    this.currentPage = parseInt(event.target.innerHTML);
    this.data = this.allRecords.slice(
      (this.currentPage - 1) * this.recordsPerPage,
      (this.currentPage - 1) * this.recordsPerPage + this.recordsPerPage
    );
  }

  displayRecords(data) {
    //return an array of data with first record per page data
    this.data = data.slice(0, this.recordsPerPage);
    this.currentPage = 1;
  }

  handleNext() {
    if (this.currentPage < this.maxPages) {
      this.data = this.allRecords.slice(
        this.currentPage * this.recordsPerPage,
        this.currentPage * this.recordsPerPage + this.recordsPerPage
      );
      this.currentPage += 1;
    }
  }

  handlePrevious() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.data = this.allRecords.slice(
        (this.currentPage - 1) * this.recordsPerPage,
        (this.currentPage - 1) * this.recordsPerPage + this.recordsPerPage
      );
    }
  }
}