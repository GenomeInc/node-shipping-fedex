var fedexAPI = require('../lib/index');
var util = require('util');
var fs = require('fs');

var fedex = new fedexAPI({
  environment: 'sandbox', // or live
  debug: true,
  key: 'KEY',
  password: 'DEVPASSWORD',
  account_number: 'ACCOUNT#',
  meter_number: 'METER#',
  imperial: true // set to false for metric
});

fedex.rates({
  ReturnTransitAndCommit: true,
  RequestedShipment: {
    DropoffType: 'REGULAR_PICKUP',
    ServiceType: 'FEDEX_GROUND',
    PackagingType: 'YOUR_PACKAGING',
    Shipper: {
      Contact: {
        PersonName: 'Sender Name',
        CompanyName: 'Company Name',
        PhoneNumber: '5555555555'
      },
      Address: {
        StreetLines: [
          'Address Line 1'
        ],
        City: 'Collierville',
        StateOrProvinceCode: 'TN',
        PostalCode: '38017',
        CountryCode: 'US'
      }
    },
    Recipient: {
      Contact: {
        PersonName: 'Recipient Name',
        CompanyName: 'Company Receipt Name',
        PhoneNumber: '5555555555'
      },
      Address: {
        StreetLines: [
          'Address Line 1'
        ],
        City: 'Charlotte',
        StateOrProvinceCode: 'NC',
        PostalCode: '28202',
        CountryCode: 'US',
        Residential: false
      }
    },
    ShippingChargesPayment: {
      PaymentType: 'SENDER',
      Payor: {
        ResponsibleParty: {
          AccountNumber: fedex.options.account_number
        }
      }
    },
    PackageCount: '1',
    RequestedPackageLineItems: {
      SequenceNumber: 1,
      GroupPackageCount: 1,
      Weight: {
        Units: 'LB',
        Value: '50.0'
      },
      Dimensions: {
        Length: 108,
        Width: 5,
        Height: 5,
        Units: 'IN'
      }
    }
  }
}, function(err, res) {
  if(err) {
    return console.log(err);
  }

  console.log(res);
});