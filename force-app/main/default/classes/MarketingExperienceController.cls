public with sharing class MarketingExperienceController {
    
    @AuraEnabled(cacheable=true)
    public static List<Marketing_Experience__c> returnAllMarketingExperiences(){
        try {
            system.debug('Are any records returned');
            system.debug([select Name, Source__c, Type__c, createddate from Marketing_Experience__c]);
            return [select Name, Source__c, Type__c, CreatedDate from Marketing_Experience__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}