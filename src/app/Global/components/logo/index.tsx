interface LogoProps {
  color?: string;
  size?: number;
}

export function Logo({ color = "#2BE888", size = 100 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 112 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_109_17"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="112"
        height="70"
      >
        <path d="M0 0H112V69.9318H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_109_17)">
        <path
          d="M1.69524 23.1211C0.71486 23.555 0.0816956 24.5366 0.0816956 25.6349V66.628C0.0816956 68.2709 1.38304 69.6086 2.98491 69.6086C4.58679 69.6086 5.88813 68.2709 5.88813 66.628V26.6404L54.9977 46.9454C56.7105 47.6607 58.6362 47.6337 60.3227 46.8706L111.271 24.1535C111.965 23.8483 111.95 22.8428 111.244 22.5495L58.3999 0.700285C56.7105 9.19402e-06 54.8139 0.0119792 53.1245 0.75116L1.69524 23.1211ZM96.2263 24.372L60.2352 40.4065C58.537 41.1577 56.6259 41.1846 54.9131 40.4843L16.3514 24.5366C15.9779 24.384 15.9662 23.8363 16.3397 23.6717L53.1858 7.25415C54.8869 6.50001 56.798 6.47607 58.5108 7.17634L96.1913 22.753C96.8974 23.0463 96.9091 24.0518 96.2263 24.372Z"
          fill={color}
        />
      </g>
      <path
        d="M78.0221 59.8706C72.274 59.8706 67.5967 64.6768 67.5967 70.5782C67.5967 76.4797 72.274 81.2859 78.0221 81.2859C83.7672 81.2859 88.4445 76.4797 88.4445 70.5782C88.4445 64.6768 83.7789 59.8706 78.0221 59.8706ZM78.0221 75.3335C75.4777 75.3335 73.3915 73.2028 73.3915 70.5782C73.3915 67.9537 75.4777 65.8379 78.0221 65.8379C80.5635 65.8379 82.6497 67.9657 82.6497 70.5902C82.6497 73.2177 80.5781 75.3335 78.0221 75.3335Z"
        fill={color}
      />
      <path
        d="M35.4017 59.8706C29.6565 59.8706 24.9764 64.6768 24.9764 70.5782C24.9764 76.4797 29.6565 81.2859 35.4017 81.2859C41.1468 81.2859 45.827 76.4797 45.827 70.5782C45.827 64.6768 41.1468 59.8706 35.4017 59.8706ZM35.4017 75.3335C32.8574 75.3335 30.774 73.2028 30.774 70.5782C30.774 67.9537 32.8457 65.823 35.4017 65.823C37.946 65.823 40.0322 67.9537 40.0322 70.5782C40.0322 73.2028 37.946 75.3335 35.4017 75.3335Z"
        fill={color}
      />
      <mask
        id="mask1_109_17"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="9"
        y="44"
        width="95"
        height="60"
      >
        <path d="M9.66661 44.6501H103.783V104H9.66661V44.6501Z" fill="white" />
      </mask>
      <g mask="url(#mask1_109_17)">
        <path
          d="M80.1433 45.2756C70.2024 44.5633 61.2155 49.9172 56.7104 58.3414C52.2199 49.9172 43.2593 44.5633 33.3038 45.2756C21.1307 46.1435 11.0643 56.6476 10.4078 69.1748C9.68706 82.905 19.7885 94.7318 33.0558 95.8421C33.3038 95.9199 33.5781 95.9558 33.8494 95.9558H45.2551C46.8337 95.9558 48.3217 96.5813 49.4276 97.7275L54.6767 103.12C55.2224 103.683 55.9547 104 56.725 104C57.4924 104 58.2394 103.683 58.7704 103.12L64.0225 97.7275C65.1371 96.5813 66.6164 95.9558 68.192 95.9558H80.1667C80.7269 95.9558 82.8248 95.5249 82.8248 95.5249C95.1613 93.2176 103.947 81.6301 102.99 68.6421C102.085 56.1867 92.2552 46.1435 80.1433 45.2756ZM80.1929 89.9915C79.9333 90.0154 80.4147 89.8898 80.1929 89.9915H68.192C65.0875 89.9915 62.1113 91.2544 59.9142 93.5108L57.0839 96.4167C56.8855 96.6202 56.55 96.6202 56.3515 96.4167L53.5329 93.5228C51.3388 91.2664 48.3597 89.9915 45.2435 89.9915H34.4476C34.3104 89.9646 34.1616 89.9406 34.0128 89.9287C23.6254 89.3271 15.6452 80.1637 16.2025 69.495C16.7102 59.9096 24.4074 51.8923 33.7152 51.2279C43.84 50.5157 52.6664 58.0092 53.8189 68.3219C53.9444 69.4561 54.6009 70.4885 55.6454 70.8835C57.5566 71.5988 59.4036 70.297 59.602 68.4236C60.7195 58.0481 69.5692 50.5037 79.7349 51.2279C89.0047 51.8923 96.5122 59.5654 97.2067 69.073C97.9536 79.3228 90.0726 88.6149 80.1929 89.9915Z"
          fill={color}
        />
      </g>
    </svg>
  );
}