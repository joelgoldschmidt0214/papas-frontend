"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Figma MCP準拠のプロフィール画面用画像・SVG定数
const imgUserIcon = "/images/icon_image_01.png";
const imgNoticeStateNew = "/icons/notice_state=new.svg";
const imgArrowLeft = "/icons/arrow_left.svg";
const imgFluentMdl2Street = "/icons/btn_home_icon.svg";
const imgEmojiPeople = "/icons/emoji-people.svg";
const imgHeart = "/icons/engade_heart=default.svg";
const imgCommentsDuotone = "/icons/comments-duotone.svg";
const imgArticleLight = "/icons/article-light.svg";
const imgTaskDone = "/icons/task-done.svg";
const imgLightBulb = "/icons/light_bulb.svg";
const imgBookmark = "/icons/engage_bookmark=default.svg";

// フッター用アイコン
const imgBtnHome = "/icons/btn_home.svg";
const imgBtnTimeline = "/icons/btn_timeline.svg";
const imgBtnSurvey = "/icons/btn_survey.svg";
const imgBtnMypage = "/icons/btn_mypage.svg";

interface BtnNoticeProps {
  noticeState?: "new" | "default";
}

function BtnNotice({ noticeState = "default" }: BtnNoticeProps) {
  if (noticeState === "new") {
    return (
      <div className="relative size-full">
        <div className="absolute inset-[3.571%]">
          <div className="absolute inset-[-2.448%]">
            <Image alt="" className="block max-w-none size-full" src={imgNoticeStateNew} width={24} height={24} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function MypageProfile() {
  const router = useRouter();
  return (
    <div className="bg-brand-white relative size-full">
      {/* ナビゲーションバー */}
      <div className="absolute bg-brand-white h-[92px] left-0 top-0 w-[392px]">
        <div className="absolute inset-0" />
        {/* 戻るボタン */}
        <button
          className="absolute left-4 top-[53.26%] translate-y-[-50%]"
          onClick={() => router.push("/mypage")}
        >
          <Image alt="戻る" src={imgArrowLeft} width={24} height={24} />
        </button>
        {/* お知らせボタン */}
        <div className="absolute aspect-[14/14] left-[90.05%] overflow-clip right-[4.34%] translate-y-[-50%]" style={{ top: "calc(50% + 13px)" }}>
          <BtnNotice noticeState="new" />
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="absolute left-[17px] top-[86px]">
        {/* ユーザー名 */}
        <div className="absolute flex flex-col font-bold justify-end leading-[0] left-[98.5px] text-text-primary text-[14px] text-center text-nowrap top-[41px] tracking-[-0.28px] translate-x-[-50%] translate-y-[-100%]">
          <p className="leading-[normal] whitespace-pre">username</p>
        </div>
        
        {/* フォロー情報 */}
        <div className="absolute flex flex-col font-bold justify-end leading-[0] left-[98.5px] text-text-primary text-[0px] text-center text-nowrap top-[64px] tracking-[-0.24px] translate-x-[-50%] translate-y-[-100%]">
          <p className="leading-[17px] text-[12px] whitespace-pre">
            <span>フォロー　</span>
            <span className="text-brand-blue">10</span>
            <span>　フォロワー　</span>
            <span className="text-brand-blue">20</span>
          </p>
        </div>

        {/* プロフィール画像 */}
        <div className="absolute left-0 top-0">
          <div className="absolute w-[54px] h-[54px] border-2 border-gray-200 rounded-full overflow-hidden">
            <Image alt="プロフィール画像" src={imgUserIcon} width={50} height={50} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ボタン群 */}
        <div className="absolute left-0 top-[58px]">
          <div className="absolute bg-white h-[25px] left-0 rounded-[7px] top-0 w-[175px] border border-brand-blue">
            <div className="absolute flex flex-col font-bold h-[20.238px] justify-center leading-[0] left-[87.5px] text-brand-blue text-[10px] text-center top-[12.12px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-50%] w-[95px]">
              <p className="leading-[17px]">プロフィールを編集</p>
            </div>
          </div>
          <div className="absolute bg-white h-[25px] left-[183px] rounded-[7px] top-0 w-[175px] border border-brand-blue">
            <div className="absolute flex flex-col font-bold h-[20.238px] justify-center leading-[0] left-[87.5px] text-brand-blue text-[10px] text-center top-[12.12px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-50%] w-[111px]">
              <p className="leading-[17px]">プロフィールをシェア</p>
            </div>
          </div>
        </div>
      </div>

      {/* あなたのまち */}
      <div className="absolute left-[17px] top-[214px]">
        <div className="flex flex-col font-bold justify-center leading-[0] text-brand-blue text-[15px] text-nowrap tracking-[-0.3px] translate-y-[-50%]">
          <p className="leading-[normal] whitespace-pre">あなたのまち</p>
        </div>
        <div className="absolute bg-brand-secondary h-[25px] left-[135px] rounded-[5px] top-[-13px] w-56 border-[0.5px] border-brand-blue">
          <div className="absolute left-[-26px] top-[-1px] w-[27px] h-[29px]">
            <Image alt="エリアアイコン" src={imgFluentMdl2Street} width={27} height={29} />
          </div>
          <div className="absolute font-normal leading-[0] left-[15px] text-black text-[12px] text-nowrap top-[6px] tracking-[-0.24px]">
            <p className="leading-[normal] whitespace-pre">東京都江東区</p>
          </div>
        </div>
      </div>

      {/* 区切り線 */}
      <div className="absolute h-0 left-0 top-[248px] w-[393px]">
        <div className="h-[0.5px] bg-gray-300 w-full" />
      </div>

      {/* やりとりしたご近所さん */}
      <div className="absolute left-4 top-[272px]">
        <div className="absolute bg-[#f3f3f3] h-[136px] left-0 rounded-[5px] top-0 w-[360px]" />
        
        {/* タイトル */}
        <div className="absolute flex flex-col font-bold justify-center leading-[0] left-[54px] text-black text-[12px] text-nowrap top-[20px] translate-y-[-50%]">
          <p className="leading-[20px] whitespace-pre">やりとりしたご近所さん</p>
        </div>
        
        {/* アイコンと数字 */}
        <div className="absolute left-[15px] top-[9px] w-[23px] h-[23px]">
          <Image alt="ご近所さんアイコン" src={imgEmojiPeople} width={23} height={23} />
        </div>
        <div className="absolute font-bold h-[17px] leading-[0] left-[316px] text-brand-blue text-[14px] top-[13px] w-[19px]">
          <p className="leading-[17px]">18</p>
        </div>
        <div className="absolute left-[332px] top-[14px] w-4 h-4">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-3.5 h-[7px] rotate-[270deg]">
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                <path d="M1 1l6 5 6-5" stroke="#1B6AAC" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* カード */}
        <div className="absolute left-4 top-10">
          {/* いいねカード */}
          <div className="absolute bg-white h-20 left-0 rounded-[5px] top-0 w-40">
            <div className="absolute flex flex-col font-bold h-[11px] justify-center leading-[0] left-[49px] text-text-primary text-[12px] top-[21.5px] translate-x-[-50%] translate-y-[-50%] w-[103px]">
              <p className="leading-[19px]">いいねされた数</p>
            </div>
            <div className="absolute font-bold h-[17px] leading-[0] left-[32px] text-text-primary text-[14px] top-[52px] w-[18px]">
              <p className="leading-[18px]">16</p>
            </div>
            <div className="absolute left-3 overflow-clip size-5 top-[52px]">
              <Image alt="いいねアイコン" src={imgHeart} width={20} height={20} />
            </div>
          </div>

          {/* コメントカード */}
          <div className="absolute bg-white h-20 left-[168px] rounded-[5px] top-0 w-40">
            <div className="absolute flex flex-col font-bold h-3 justify-center leading-[0] left-[49px] text-text-primary text-[12px] top-[22px] translate-x-[-50%] translate-y-[-50%] w-[117px]">
              <p className="leading-[17px]">もらったコメント数</p>
            </div>
            <div className="absolute font-bold h-4 leading-[0] left-[40px] text-text-primary text-[14px] top-[53px] w-2">
              <p className="leading-[18px]">7</p>
            </div>
            <div className="absolute left-[8px] size-[23px] top-[50px]">
              <Image alt="コメントアイコン" src={imgCommentsDuotone} width={23} height={23} />
            </div>
          </div>
        </div>
      </div>

      {/* まちのアンケート */}
      <div className="absolute left-4 top-[432px]">
        <div className="absolute bg-[#f3f3f3] h-[136px] rounded-[5px] w-[360px]" />
        
        {/* タイトル */}
        <div className="absolute flex flex-col font-bold justify-center leading-[0] left-[54px] text-black text-[12px] text-nowrap top-[20px] translate-y-[-50%]">
          <p className="leading-[20px] whitespace-pre">まちのアンケート</p>
        </div>
        
        {/* アイコンと数字 */}
        <div className="absolute left-[15px] top-[8px] w-6 h-6">
          <Image alt="アンケートアイコン" src={imgArticleLight} width={24} height={24} />
        </div>
        <div className="absolute font-bold h-[17px] leading-[0] left-[324px] text-brand-blue text-[14px] top-[13px] w-[3px]">
          <p className="leading-[17px]">5</p>
        </div>
        <div className="absolute left-[332px] top-[14px] w-4 h-4">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-3.5 h-[7px] rotate-[270deg]">
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                <path d="M1 1l6 5 6-5" stroke="#1B6AAC" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* カード */}
        <div className="absolute left-4 top-10">
          {/* 回答数カード */}
          <div className="absolute bg-white h-20 rounded-[5px] w-40">
            <div className="absolute flex flex-col font-bold h-[11px] justify-center leading-[0] left-[65px] text-text-primary text-[12px] top-[21.5px] translate-x-[-50%] translate-y-[-50%] w-[103px]">
              <p className="leading-[19px]">アンケート回答数</p>
            </div>
            <div className="absolute flex flex-col font-bold h-4 justify-center left-4 text-text-primary text-[14px] top-[48px] translate-y-[-50%] w-[18px]">
              <p className="leading-[18px]">9</p>
            </div>
            <div className="absolute left-1 top-10 w-4 h-4">
              <Image alt="完了アイコン" src={imgTaskDone} width={16} height={16} />
            </div>
          </div>

          {/* 未回答カード */}
          <div className="absolute bg-white h-20 left-[168px] rounded-[5px] w-40">
            <div className="absolute flex flex-col font-bold h-3 justify-center leading-[0] text-text-primary text-[12px] top-[22px] translate-y-[-50%] w-[117px]">
              <p className="leading-[17px]">未回答のアンケート</p>
            </div>
            <div className="absolute flex flex-col font-bold h-4 justify-center left-8 text-text-primary text-[14px] top-[48px] translate-y-[-50%] w-2">
              <p className="leading-[18px]">3</p>
            </div>
            <div className="absolute left-0 top-[41px] w-3.5 h-3.5">
              <Image alt="電球アイコン" src={imgLightBulb} width={14} height={14} />
            </div>
          </div>
        </div>
      </div>

      {/* エンゲージメント */}
      <div className="absolute left-4 top-[592px]">
        <div className="absolute bg-white h-20 rounded-[5px] w-[360px] border-[0.5px] border-text-secondary">
          {/* いいね */}
          <div className="absolute left-[89px] top-2">
            <div className="absolute left-[2px] w-[26px] h-[26px]">
              <Image alt="いいねアイコン" src={imgHeart} width={26} height={26} />
            </div>
            <div className="absolute flex flex-col font-bold justify-center leading-[0] text-brand-blue text-[10px] text-nowrap top-[33px] translate-y-[-50%]">
              <p className="leading-[normal] whitespace-pre">いいね</p>
            </div>
          </div>
          <div className="absolute flex flex-col font-bold justify-center leading-[0] left-6 text-brand-blue text-[14px] text-nowrap top-[55.5px] translate-y-[-50%]">
            <p className="leading-[17px] whitespace-pre">24</p>
          </div>

          {/* ブックマーク */}
          <div className="absolute left-[258px] top-[10px]">
            <div className="absolute left-[18px] w-6 h-6">
              <Image alt="ブックマークアイコン" src={imgBookmark} width={24} height={24} />
            </div>
            <div className="absolute flex flex-col font-bold justify-center leading-[0] text-brand-blue text-[10px] text-nowrap top-[23px] translate-y-[-50%]">
              <p className="leading-[normal] whitespace-pre">ブックマーク</p>
            </div>
          </div>
          <div className="absolute flex flex-col font-bold justify-center leading-[0] left-[280px] text-brand-blue text-[14px] text-nowrap top-[55.5px] translate-y-[-50%]">
            <p className="leading-[17px] whitespace-pre">13</p>
          </div>

          {/* 区切り線 */}
          <div className="absolute flex h-[66px] items-center justify-center left-[196px] top-2 w-[0px]">
            <div className="flex-none rotate-[90deg]">
              <div className="h-0 relative w-[66px]">
                <div className="absolute bottom-0 left-0 right-0 top-[-0.5px] bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッターは再利用するので一旦消しました*/}

    </div>
  );
}