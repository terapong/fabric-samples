package main

import (
  "encoding/json"
  "fmt"
  "log"

  "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
  contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset

/*สารบรรณ ลงทะเบียนหนังสือรับ
ประเภทหนังสือ     ptsw_book_type           --ภายนอง ถายใน
เลขทะเบียนรับ     ptsw_book_receive_number --text
รับวันที่          ptsw_book_receive_date    --cal         
ชั้นความลับ       ptsw_book_secret_class   --ปกติ           ///ด่วน ด่วนมาก ด่วนที่สุด 
เลขที่หนังสือ       ptsw_book_number         --text   
ลงวันที่           ptsw_book_go_date       --cal
จาก             ptsw_book_from          --text
ถึง              ptsw_book_to            --text
เรื่อง            ptsw_book_subject       --text
การปฎิบัติ         ptsw_book_mission       --text          ///ต้องเป็น ให้ใครไปทำ หน่วยงานที่ทำ ต้องทำอีก
หมาบเหตุ         ptsw_book_note          --text
แฟ้มเก็บ          ptsw_book_fame          --text
อัปโหลดไฟล์       ptsw_book_file          --dowload file  ///หลายไฟล์
บันทึกข้อมูล

type Asset struct {
  ID             string `json:"ID"`
  Color          string `json:"color"`
  Size           int    `json:"size"`
  Owner          string `json:"owner"`
  AppraisedValue int    `json:"appraisedValue"`
  From           string `json:"from"`      //from
	Too            string `json:"too"`       //to
  BookType       int    `json:"bookType"`
}

*/

type Asset struct {
  ID                        string `json:"ID"`
  Ptsw_book_type            string `json:"ptsw_book_type"`
  Ptsw_book_receive_number  string `json:"ptsw_book_receive_number"`
  Ptsw_book_receive_date    string `json:"ptsw_book_receive_date"`
  Ptsw_book_secret_class    string `json:"ptsw_book_secret_class"`
  Ptsw_book_number          string `json:"ptsw_book_number"`
  Ptsw_book_go_date         string `json:"ptsw_book_go_date"`
  Ptsw_book_from            string `json:"ptsw_book_from"`
  Ptsw_book_to              string `json:"ptsw_book_to"`
  Ptsw_book_subject         string `json:"ptsw_book_subject"`
  Ptsw_book_mission         string `json:"ptsw_book_mission"`
  Ptsw_book_note            string `json:"ptsw_book_note"`
  Ptsw_book_fame            string `json:"ptsw_book_fame"`
  Ptsw_book_file            string `json:"ptsw_book_file"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {

  assets := []Asset{
    {ID: "1", 
      Ptsw_book_type:           "Ptsw_book_type_1", 
      Ptsw_book_receive_number: "Ptsw_book_receive_number_1",
      Ptsw_book_receive_date:   "Ptsw_book_receive_date_1",
      Ptsw_book_secret_class:   "Ptsw_book_secret_class_1",
      Ptsw_book_number:         "Ptsw_book_number_1",
      Ptsw_book_go_date:        "Ptsw_book_go_date_1",
      Ptsw_book_from:           "Ptsw_book_from_1",
      Ptsw_book_to:             "Ptsw_book_to_1",
      Ptsw_book_subject:        "Ptsw_book_subject_1",
      Ptsw_book_mission:        "Ptsw_book_mission_1",
      Ptsw_book_note:           "Ptsw_book_note_1",
      Ptsw_book_fame:           "Ptsw_book_fame_1",
      Ptsw_book_file:           "Ptsw_book_file_1",
      },
      {ID: "2", 
      Ptsw_book_type:           "Ptsw_book_type_2", 
      Ptsw_book_receive_number: "Ptsw_book_receive_number_2",
      Ptsw_book_receive_date:   "Ptsw_book_receive_date_2",
      Ptsw_book_secret_class:   "Ptsw_book_secret_class_2",
      Ptsw_book_number:         "Ptsw_book_number_2",
      Ptsw_book_go_date:        "Ptsw_book_go_date_2",
      Ptsw_book_from:           "Ptsw_book_from_2",
      Ptsw_book_to:             "Ptsw_book_to_2",
      Ptsw_book_subject:        "Ptsw_book_subject_2",
      Ptsw_book_mission:        "Ptsw_book_mission_2",
      Ptsw_book_note:           "Ptsw_book_note_2",
      Ptsw_book_fame:           "Ptsw_book_fame_2",
      Ptsw_book_file:           "Ptsw_book_file_2",
      },
      {ID: "3", 
      Ptsw_book_type:           "Ptsw_book_type_3", 
      Ptsw_book_receive_number: "Ptsw_book_receive_number_3",
      Ptsw_book_receive_date:   "Ptsw_book_receive_date_3",
      Ptsw_book_secret_class:   "Ptsw_book_secret_class_3",
      Ptsw_book_number:         "Ptsw_book_number_3",
      Ptsw_book_go_date:        "Ptsw_book_go_date_3",
      Ptsw_book_from:           "Ptsw_book_from_3",
      Ptsw_book_to:             "Ptsw_book_to_3",
      Ptsw_book_subject:        "Ptsw_book_subject_3",
      Ptsw_book_mission:        "Ptsw_book_mission_3",
      Ptsw_book_note:           "Ptsw_book_note_3",
      Ptsw_book_fame:           "Ptsw_book_fame_3",
      Ptsw_book_file:           "Ptsw_book_file_3",
      },
      {ID: "4", 
      Ptsw_book_type:           "Ptsw_book_type_4", 
      Ptsw_book_receive_number: "Ptsw_book_receive_number_4",
      Ptsw_book_receive_date:   "Ptsw_book_receive_date_4",
      Ptsw_book_secret_class:   "Ptsw_book_secret_class_4",
      Ptsw_book_number:         "Ptsw_book_number_4",
      Ptsw_book_go_date:        "Ptsw_book_go_date_4",
      Ptsw_book_from:           "Ptsw_book_from_4",
      Ptsw_book_to:             "Ptsw_book_to_4",
      Ptsw_book_subject:        "Ptsw_book_subject_4",
      Ptsw_book_mission:        "Ptsw_book_mission_4",
      Ptsw_book_note:           "Ptsw_book_note_4",
      Ptsw_book_fame:           "Ptsw_book_fame_4",
      Ptsw_book_file:           "Ptsw_book_file_4",
      },
      {ID: "5", 
      Ptsw_book_type:           "Ptsw_book_type_5", 
      Ptsw_book_receive_number: "Ptsw_book_receive_number_5",
      Ptsw_book_receive_date:   "Ptsw_book_receive_date_5",
      Ptsw_book_secret_class:   "Ptsw_book_secret_class_5",
      Ptsw_book_number:         "Ptsw_book_number_5",
      Ptsw_book_go_date:        "Ptsw_book_go_date52",
      Ptsw_book_from:           "Ptsw_book_from_5",
      Ptsw_book_to:             "Ptsw_book_to_5",
      Ptsw_book_subject:        "Ptsw_book_subject_5",
      Ptsw_book_mission:        "Ptsw_book_mission_5",
      Ptsw_book_note:           "Ptsw_book_note_5",
      Ptsw_book_fame:           "Ptsw_book_fame_5",
      Ptsw_book_file:           "Ptsw_book_file_5",
      },
  }

  for _, asset := range assets {
    assetJSON, err := json.Marshal(asset)
    if err != nil {
      return err
    }

    err = ctx.GetStub().PutState(asset.ID, assetJSON)
    if err != nil {
      return fmt.Errorf("failed to put to world state. %v", err)
    }
  }

  return nil
}

// CreateAsset issues a new asset to the world state with given details.
  func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, 
    id                        string, 
    ptsw_book_type            string, 
    ptsw_book_receive_number  string,
    ptsw_book_receive_date    string,
    ptsw_book_secret_class    string,
    ptsw_book_number          string,
    ptsw_book_go_date         string,
    ptsw_book_from            string,
    ptsw_book_to              string,
    ptsw_book_subject         string,
    ptsw_book_mission         string,
    ptsw_book_note            string,
    ptsw_book_fame            string,
    ptsw_book_file            string, 
    ) error {
  exists, err := s.AssetExists(ctx, id)
  if err != nil {
    return err
  }
  if exists {
    return fmt.Errorf("the asset %s already exists", id)
  }

  asset := Asset{
    ID:                       id,
    Ptsw_book_type:           ptsw_book_type,
    Ptsw_book_receive_number: ptsw_book_receive_number,
    Ptsw_book_receive_date:   ptsw_book_receive_date,
    Ptsw_book_secret_class:   ptsw_book_secret_class,
    Ptsw_book_number:         ptsw_book_number,
    Ptsw_book_go_date:        ptsw_book_go_date,
    Ptsw_book_from:           ptsw_book_from,
    Ptsw_book_to:             ptsw_book_to,
    Ptsw_book_subject:        ptsw_book_subject,
    Ptsw_book_mission:        ptsw_book_mission,
    Ptsw_book_note:           ptsw_book_note,
    Ptsw_book_fame:           ptsw_book_fame,
    Ptsw_book_file:           ptsw_book_file, 
  }
  assetJSON, err := json.Marshal(asset)
  if err != nil {
    return err
  }

  return ctx.GetStub().PutState(id, assetJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
  assetJSON, err := ctx.GetStub().GetState(id)
  if err != nil {
    return nil, fmt.Errorf("failed to read from world state: %v", err)
  }
  if assetJSON == nil {
    return nil, fmt.Errorf("the asset %s does not exist", id)
  }

  var asset Asset
  err = json.Unmarshal(assetJSON, &asset)
  if err != nil {
    return nil, err
  }

  return &asset, nil
}

// UpdateAsset updates an existing asset in the world state with provided parameters.
  func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, 
    id                        string, 
    ptsw_book_type            string, 
    ptsw_book_receive_number  string,
    ptsw_book_receive_date    string,
    ptsw_book_secret_class    string,
    ptsw_book_number          string,
    ptsw_book_go_date         string,
    ptsw_book_from            string,
    ptsw_book_to              string,
    ptsw_book_subject         string,
    ptsw_book_mission         string,
    ptsw_book_note            string,
    ptsw_book_fame            string,
    ptsw_book_file            string, 
    ) error {
  exists, err := s.AssetExists(ctx, id)
  if err != nil {
    return err
  }
  if !exists {
    return fmt.Errorf("the asset %s does not exist", id)
  }

  // overwriting original asset with new asset
  asset := Asset{
    ID:                       id,
    Ptsw_book_type:           ptsw_book_type,
    Ptsw_book_receive_number: ptsw_book_receive_number,
    Ptsw_book_receive_date:   ptsw_book_receive_date,
    Ptsw_book_secret_class:   ptsw_book_secret_class,
    Ptsw_book_number:         ptsw_book_number,
    Ptsw_book_go_date:        ptsw_book_go_date,
    Ptsw_book_from:           ptsw_book_from,
    Ptsw_book_to:             ptsw_book_to,
    Ptsw_book_subject:        ptsw_book_subject,
    Ptsw_book_mission:        ptsw_book_mission,
    Ptsw_book_note:           ptsw_book_note,
    Ptsw_book_fame:           ptsw_book_fame,
    Ptsw_book_file:           ptsw_book_file,
  }
  assetJSON, err := json.Marshal(asset)
  if err != nil {
    return err
  }

  return ctx.GetStub().PutState(id, assetJSON)
}

// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
  exists, err := s.AssetExists(ctx, id)
  if err != nil {
    return err
  }
  if !exists {
    return fmt.Errorf("the asset %s does not exist", id)
  }

  return ctx.GetStub().DelState(id)
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
  assetJSON, err := ctx.GetStub().GetState(id)
  if err != nil {
    return false, fmt.Errorf("failed to read from world state: %v", err)
  }

  return assetJSON != nil, nil
}

// TransferAsset updates the owner field of asset with given id in world state.
/*
func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) error {
  asset, err := s.ReadAsset(ctx, id)
  if err != nil {
    return err
  }

  asset.Owner = newOwner
  assetJSON, err := json.Marshal(asset)
  if err != nil {
    return err
  }

  return ctx.GetStub().PutState(id, assetJSON)
}
*/
// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
  // range query with empty string for startKey and endKey does an
  // open-ended query of all assets in the chaincode namespace.
  resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
  if err != nil {
    return nil, err
  }
  defer resultsIterator.Close()

  var assets []*Asset
  for resultsIterator.HasNext() {
    queryResponse, err := resultsIterator.Next()
    if err != nil {
      return nil, err
    }

    var asset Asset
    err = json.Unmarshal(queryResponse.Value, &asset)
    if err != nil {
      return nil, err
    }
    assets = append(assets, &asset)
  }

  return assets, nil
}

func main() {
  assetChaincode, err := contractapi.NewChaincode(&SmartContract{})
  if err != nil {
    log.Panicf("Error creating asset-transfer-basic chaincode: %v", err)
  }

  if err := assetChaincode.Start(); err != nil {
    log.Panicf("Error starting asset-transfer-basic chaincode: %v", err)
  }
}