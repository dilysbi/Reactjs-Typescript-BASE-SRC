import axios from 'axios'
// import GitHub from 'github-api'
// import { PRIVATE_KEY_GITHUB } from 'constants/index'
// import { LONG_TTL, getFromStorageJSONTTL, createStorageJSONTTL } from '../Storage/index'
import { ENV_GIT_ROOT_FOLDER, ENV_GIT_ORGANIZATION, ENV_GIT_REPOS } from '../../constants'

const gitUrl = "https://api.github.com" 
const env_rootFolder = ENV_GIT_ROOT_FOLDER
const env_organization = ENV_GIT_ORGANIZATION
const env_repo = ENV_GIT_REPOS

class Git {
  constructor() {
    this.repos = []
    this.tree = []

    // // token auth
    // const gh = new GitHub({
    //   token: PRIVATE_KEY_GITHUB
    // });

    // // Get all repos of Organ
    // const yahoo = gh.getOrganization(env_organization);
    // yahoo.getRepos((err, repos) => {
    //   if(!err) {
    //     this.repos = repos
    //   }
    // });
  }

  /**
   * @param {*} _organ as a organ of your account
   * @param {*} _repo as a repo in organ
   * @returns boolean
   */
  async getRepoTreeAtOrgan(_organ=env_organization, _repo=env_repo, _token=null) {
    const repoUrl = _token ? `${gitUrl}/repos/${_organ}/${_repo}/git/trees/main?access_token=${_token}&recursive=1` : `${gitUrl}/repos/${_organ}/${_repo}/git/trees/main?recursive=1`
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await axios({
            method: 'get',
            url: repoUrl,
            headers: {
              'content-type': 'application/json;charset=UTF-8',
              Accept: 'application/vnd.github.v3+json',
            },
          }).then((resTrees) => {
            if (resTrees.status === 200) {
              this.tree = resTrees.data.tree
              resolve(resTrees.data.tree)
            }
            reject(new Error("Error!!!"))
          })
          reject(new Error("Error!!!"))
        } catch (error) {
          reject(new Error("Error!!!"))
        }
      })()
    })
  }
 
  /**
   * @param {*} addr as folder at github repo
   * @param {*} id as filename at github repo
   * @returns undefined
   */
  async getFileData(_name, _token=null) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          let data
          const path = `${env_rootFolder}/${_name}`

          const content = null // getFromStorageJSONTTL(path)

          if (content !== null) {
            data = content 
          }

          if (data === undefined) {
            const selectUrl = this.tree?.find((v) => v.path.toLowerCase() === path.toLowerCase())
            if (selectUrl && selectUrl.url) {
              const response = await axios({
                method: 'get',
                url: `${selectUrl.url}${_token ? `?access_token=${_token}` : ""}`,
                headers: {
                  'content-type': 'application/json;charset=UTF-8',
                  Accept: 'application/vnd.github.v3+json',
                },
              }) 

              if (response.status === 200) {
                data = JSON.parse(Buffer.from(response.data.content, 'base64').toString('ascii'))

                // createStorageJSONTTL(path, data, LONG_TTL)
              } else {
                reject(new Error('An error occurred!'))
              }
            } else {
              reject(new Error('Path file is not correct!'))
            }
          }
          resolve(data)
        } catch (error) {
          reject(error.message)
        } 
      })()
    })
  }
}

export default Git
