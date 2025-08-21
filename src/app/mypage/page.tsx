"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Figma MCP取得画像・SVG定数
const imgBackgroundImg = "/images/background-img.png";
const img_icon_image = "/images/icon_image_01.png";
const imgImage28 = "/images/banner_image.png";
const imgNoticeStateNew = "/icons/notice_state=new.svg";
const imgFluentMdl2Street = "/icons/btn_home_icon.svg";
const imgPostButton = "/images/post_button.png";
const img1 = "/icons/btn_home.svg";
const img2 = "/icons/btn_timeline.svg";
const img3 = "/icons/btn_survey.svg";
const img4 = "/icons/btn_mypage.svg";
const imgBtnNews = "/icons/btn_news.svg";

interface BtnNoticeProps {
  noticeState?: "new" | "default";
}

// ...existing code...

export default function Mypage() {
  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* 背景イラスト */}
      <div className="absolute bg-[49.96%_46.18%] bg-no-repeat bg-size-[100.01%_140.5%] h-[679px] left-[-23px] top-[173px] w-[440px]" style={{ backgroundImage: `url('${imgBackgroundImg}')` }} />

      {/* ナビゲーションバーは省略（スマホ本体に表示されるので非表示） */}
  {/* ナビゲーションバー枠のみ（アイコン・時刻は非表示） */}
  <div className="absolute bg-[#ffffff] h-[92px] left-0 top-0 w-[392px]" />

      {/* ユーザー情報・お知らせボタン・エリア名 */}
      <div className="absolute bottom-[87.91%] left-0 overflow-clip right-[0.25%] top-[4.7%]">
        <div className="absolute contents left-[22px] top-1.5">
          <div className="absolute bg-center bg-cover bg-no-repeat left-6 size-[45px] top-[9px]" style={{ backgroundImage: `url('${img_icon_image}')` }} />
        </div>
  <div className="absolute flex flex-col font-bold justify-end leading-[0] left-[115.5px] text-text-primary text-[14px] text-center text-nowrap top-[50px] tracking-[-0.28px] translate-x-[-50%] translate-y-[-100%]">
          <p className="leading-[normal] whitespace-pre">username</p>
        </div>
        <div className="absolute left-[354px] overflow-clip size-[22px] top-[9px]">
          <BtnNotice noticeState="new" />
        </div>
        <div className="absolute bg-[#d7e0ff] h-[21px] left-[119px] rounded-[5px] top-2 w-[169px]">
          <div aria-hidden="true" className="absolute border-[#1b6aac] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[5px]" />
        </div>
        <div className="absolute h-[26px] left-[86px] top-1.5 w-6">
          <Image alt="エリアアイコン" className="block max-w-none size-full" src={imgFluentMdl2Street} width={24} height={24} />
        </div>
  <div className="absolute font-normal leading-[0] left-[127px] text-text-primary text-[12px] text-nowrap top-2.5 tracking-[-0.24px]">
          <p className="leading-[normal] whitespace-pre">東京都江東区</p>
        </div>
      </div>

      {/* お知らせバナー */}
      {/* Figma MCP準拠：imgImage28画像のみ中央表示（青枠は画像に含まれる） */}
      <div className="absolute left-0 top-[107px] w-[393px] h-[65px] flex items-center justify-center">
        <Image alt="お知らせバナー" src={imgImage28} width={393} height={65} />
      </div>

      {/* 投稿ボタン */}
      <div className="absolute contents left-[316px] top-[700px]">
        <div className="absolute left-[316px] size-[60px] top-[700px] bg-[#1b6aac] rounded-full flex items-center justify-center">
          <Image alt="投稿アイコン" src={imgPostButton} width={24} height={24} />
        </div>
      </div>

      {/* フッター（ナビゲーション） */}
      <div className="absolute h-[84px] left-0 top-[768px] w-[393px]">
        <div className="absolute bg-[#1b6aac] inset-0" />
        <div className="absolute content-stretch flex gap-[51px] items-end justify-start left-8 top-3.5">
          {/* Home */}
          <div className="content-stretch flex flex-col gap-[3px] items-center justify-start relative shrink-0 w-[37px]">
            <div className="h-[37px] relative shrink-0 w-full">
              <div className="absolute inset-[8.33%_10.42%]">
                <div className="absolute inset-[-3.75%_-3.95%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                  <Image alt="ホームアイコン" className="block max-w-none size-full" src={img1} width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[10px] text-center w-full">
            </div>
          </div>
          {/* Timeline */}
          <div className="content-stretch flex flex-col gap-[3px] items-start justify-start relative shrink-0 w-12">
            <div className="h-[37px] relative shrink-0 w-full">
              <div className="absolute inset-[8.333%]">
                <div className="absolute inset-[-3.75%]">
                  <Image alt="タイムラインアイコン" className="block max-w-none size-full" src={img2} width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[10px] text-center w-full">
            </div>
          </div>
          {/* Survey */}
          <div className="content-stretch flex flex-col gap-[3px] items-start justify-start relative shrink-0 w-11">
            <div className="h-[37px] relative shrink-0 w-full">
              <div className="absolute inset-[11.46%_17.49%_12.02%_17.71%]">
                <div className="absolute inset-[-4.08%_-4.82%]">
                  <Image alt="アンケートアイコン" className="block max-w-none size-full" src={img3} width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[10px] text-center w-full">
            </div>
          </div>
          {/* My Page */}
          <div className="content-stretch flex flex-col gap-0.5 items-start justify-start relative shrink-0 w-11">
            <div className="h-[39px] relative shrink-0 w-full">
              <div className="absolute inset-[11.73%_20.19%_11.58%_20.06%]">
                <div className="absolute inset-[-3.88%_-5.23%_-4.07%_-5.23%]">
                  <Image alt="マイページアイコン" className="block max-w-none size-full" src={img4} width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[10px] text-center w-full">
            </div>
          </div>
        </div>
      </div>

      {/* お知らせアイコン・テキスト群（サンプル配置） */}
      <div className="absolute h-[25px] left-[254px] top-[255px] w-32">
        <Image alt="お知らせアイコン" className="block max-w-none size-full" src={imgBtnNews} width={32} height={25} />
      </div>
      <div className="absolute h-[25px] left-[220px] top-96 w-32">
        <Image alt="お知らせアイコン" className="block max-w-none size-full" src={imgBtnNews} width={32} height={25} />
      </div>
      <div className="absolute h-[25px] left-[179px] top-[560px] w-32">
        <Image alt="お知らせアイコン" className="block max-w-none size-full" src={imgBtnNews} width={32} height={25} />
      </div>
      {/* 9/6のイベントをチェック！の吹き出し枠とテキストをFigma MCP座標で統合 */}
      <div className="absolute left-[74.5px] top-[457px] w-[129px] h-[25px] flex items-center justify-center">
        <Image alt="お知らせ枠アイコン" className="absolute left-0 top-0 w-full h-full" src={imgBtnNews} width={129} height={25} />
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
          <span className="text-text-primary text-[9px] text-center leading-[normal] whitespace-pre">9/6のイベントをチェック！</span>
        </div>
      </div>
      <div className="absolute flex flex-col font-normal justify-end leading-[0] left-[320.5px] text-text-primary text-[9px] text-center text-nowrap top-[272px] tracking-[-0.18px] translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[normal] whitespace-pre">東京ガスからのお知らせです。</p>
      </div>
      <div className="absolute flex flex-col font-normal justify-end leading-[0] left-[283px] text-text-primary text-[9px] text-center text-nowrap top-[401px] tracking-[-0.18px] translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[normal] whitespace-pre">メンテナンスのお知らせ。</p>
      </div>
      <div className="absolute flex flex-col font-normal justify-end leading-[0] left-[245px] text-text-primary text-[9px] text-center text-nowrap top-[577px] tracking-[-0.18px] translate-x-[-50%] translate-y-[-100%]">
        <p className="leading-[normal] whitespace-pre">保育園情報が更新されました。</p>
      </div>
    </div>
  );
}

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
