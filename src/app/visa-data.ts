import { Country } from './country';

export class VisaData {

  bothReqCountries: Array<Country>;
  userReqCountries: Array<Country>;
  partnerReqCountries: Array<Country>;

  bothNotReqCountries: Array<Country>;
  userNotReqCountries: Array<Country>;
  partnerNotReqCountries: Array<Country>;

  bothOnArrCountries: Array<Country>;
  userOnArrCountries: Array<Country>;
  partnerOnArrCountries: Array<Country>;

  bothUnkCountries: Array<Country>;
  userUnkCountries: Array<Country>;
  partnerUnkCountries: Array<Country>;

  constructor(reqGroups, notReqGroups, onArrGroups, unkGroups) {
    console.log(notReqGroups);
      this.bothReqCountries = reqGroups.both;
      this.userReqCountries = reqGroups.user;
      this.partnerReqCountries = reqGroups.partner;

      this.bothNotReqCountries = notReqGroups.both;
      this.userNotReqCountries = notReqGroups.user;
      this.partnerNotReqCountries = notReqGroups.partner;

      this.bothOnArrCountries = onArrGroups.both;
      this.userOnArrCountries = onArrGroups.user;
      this.partnerOnArrCountries = onArrGroups.partner;

      this.bothUnkCountries = unkGroups.both;
      this.userUnkCountries = unkGroups.user;
      this.partnerUnkCountries = unkGroups.partner;
  }
}
