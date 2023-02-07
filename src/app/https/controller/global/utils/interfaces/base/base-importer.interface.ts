export default interface IBaseImporter {
  generateOutput: Function;
  onCompleted: Function;
  onLoaded: any;
  validate: Function;
  start: Function;
  addOutputRow: Function;
  load: Function;
  save: Function;
}
