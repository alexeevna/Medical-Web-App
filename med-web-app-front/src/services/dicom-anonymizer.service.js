import dcmjs from 'dcmjs'

class DicomAnonymizerService {

    async anonymizeInstance(file) {
        let readerPromise = new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        })

        let arrayBuffer = await readerPromise;
        let dicomContent = dcmjs.data.DicomMessage.readFile(arrayBuffer)
        let dicomTagsDataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomContent.dict)

        console.log(dicomTagsDataset.StudyInstanceUID);

        dicomTagsDataset = {...dicomTagsDataset, PatientName: "hello"}
        this.anonymizeTag(dicomTagsDataset, 'PatientID', 'Anonymized_PatientID');
        this.anonymizeTag(dicomTagsDataset, 'PatientName', 'Anonymized_PatientName');
        this.anonymizeTag(dicomTagsDataset, 'PatientBirthName', 'Anonymized_PatientBirthName');
        this.anonymizeTag(dicomTagsDataset, 'PatientAddress', 'Anonymized_PatientAddress');
        this.anonymizeTag(dicomTagsDataset, 'PersonName', 'Anonymized_PersonName');
        this.anonymizeTag(dicomTagsDataset, 'ReferringPhysicianName', 'Anonymized_ReferringPhysicianName');
        this.anonymizeTag(dicomTagsDataset, 'ReferringPhysicianAddress', 'Anonymized_ReferringPhysicianAddress');
        this.anonymizeTag(dicomTagsDataset, 'ReferringPhysicianTelephoneNumbers', 'Anonymized_ReferringPhysicianTelephoneNumbers');
        this.anonymizeTag(dicomTagsDataset, 'InstitutionalDepartmentName', 'Anonymized_InstitutionalDepartmentName');
        this.anonymizeTag(dicomTagsDataset, 'PerformingPhysicianName', 'Anonymized_PerformingPhysicianName');
        this.anonymizeTag(dicomTagsDataset, 'InstitutionName', 'Anonymized_InstitutionName');
        this.anonymizeTag(dicomTagsDataset, 'InstitutionAddress', 'Anonymized_InstitutionAddress');
        this.anonymizeTag(dicomTagsDataset, 'PatientBirthDate', 'Anonymized_BirthDate');
        this.anonymizeTag(dicomTagsDataset, 'StudyDate', '00/00/0000');

        dicomContent.dict = dcmjs.data.DicomMetaDictionary.denaturalizeDataset(dicomTagsDataset);
        return {dicom: dicomContent.write(), UID: dicomTagsDataset.StudyInstanceUID};
    }

    anonymizeTag(tagsDataset, tagToAnonymize, replaceValue) {
        if (tagsDataset[tagToAnonymize] !== undefined && tagsDataset[tagToAnonymize] != null) {
            tagsDataset[tagToAnonymize] = replaceValue;
        }
    }

}

export default new DicomAnonymizerService();