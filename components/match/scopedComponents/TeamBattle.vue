<script>
import { matchTeamUrl } from '~/assets/js/config'
export default {
  name: 'TeamBattle',
  props: {
    record: {
      type: Object,
      required: true
    },
    isShowScore: {
      type: Boolean,
      default: true
    }
  },
  render () {
    const { record, isShowScore } = this
    // console.log('record', record)
    // 0:未开始，1：进行中，2：已结束
    const countVm = (status) => {
      if (!isShowScore) {
        return (
          <img
            src={require('~/assets/img/vs.png')}
            style={{ width: '18px' }}
            alt="vs"
          />
        )
      }
      if (status === 0) {
        return (
          <img
            src={require('~/assets/img/vs.png')}
            style={{ width: '18px' }}
            alt="vs"
          />
        )
      }
      if (status === 1) {
        return (
          <div class="count processing">
            <span class="score">
              {record.teamAScore || record.team_a_score || 0}
            </span>
            <span>:</span>
            <span class="score">
              {record.teamBScore || record.team_b_score || 0}
            </span>
          </div>
        )
      }
      if (status === 2 || status === undefined) {
        return (
          <div class="count finsh">
            <span class="score">
              {record.teamAScore || record.team_a_score || 0}
            </span>
            <span class="colon">:</span>
            <span class="score">
              {record.teamBScore || record.team_b_score || 0}
            </span>
          </div>
        )
      }
    }

    const showTeamLogo = (url) => {
      if (url) {
        return (
          <div class="imgBox">
            <img style={{ margin: '0 4px' }} src={url} />
          </div>
        )
      }
      return null
    }

    const teamAName = record.teamAShortName || record.teamAName || record.team_a_name
    const teamBName = record.teamBShortName || record.teamBName || record.team_b_name

    return (
      <div class="teamBattleGroup">
        <div class="teamItem tableImgBox" title={record.teamAName}>
          {
            teamAName ? (
              <nuxt-link
                to={matchTeamUrl({
                  id: record.team_a_id || record.teamAId,
                  gameType: this.$route.params.gameType
                })}
              >
                <span>
                  {teamAName}
                </span>
                {showTeamLogo(record.teamALogo || record.team_a_logo)}
              </nuxt-link>
            ) : (
              <a title="待定">
                <span>TBD</span>
                <GameTypeIcon type={this.$route.params.gameType} style="font-size: 16px;color: #999;"/>
              </a>
            )
          }

        </div>

        {countVm(record.status)}

        <div class="teamItem tableImgBox" title={record.teamBName}>
          {
            teamBName ? (
              <nuxt-link
                to={matchTeamUrl({
                  id: record.team_b_id || record.teamBId,
                  gameType: this.$route.params.gameType
                })}
              >
                {showTeamLogo(record.teamBLogo || record.team_b_logo)}
                <span>
                  {teamBName}
                </span>
              </nuxt-link>
            ) : (
              <a title="待定">
                <GameTypeIcon type={this.$route.params.gameType} style="font-size: 16px;color: #999;"/>
                <span>TBD</span>
              </a>
            )
          }
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.teamBattleGroup {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .teamItem {
    padding: 0 6px;
    width: 86px;
    a {
      display: flex;
      justify-content: space-around;
      .imgBox {
        height: 16px;
        img {
          height: 100%;
        }
      }
      span {
        transition: color 0.2s;
        color: #595959;
        vertical-align: middle;
        display: inline-block;
        width: 80px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        font-size: 14px;
      }
    }
    a {
      &:hover {
        span {
          color: @primary-color;
        }
      }
    }
  }
}
.count {
  width: 84px !important;
  height: 30px;
  span {
    line-height: 30px;
    display: inline-block;
    font-size: 14px;
    text-align: center;
  }
}

.notStarted {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 0 6px;
  border-radius: 4px;
}
.finsh,
.processing {
  .colon {
    width: 20px;
  }
  .score {
    border-radius: 4px;
    display: inline-block;
    width: 30px !important;
  }
}
.finsh {
  .score {
    background-color: #f5f5f5;
  }
}
.processing {
  .score {
    background-color: #fff;
  }
}
</style>
